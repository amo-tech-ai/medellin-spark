import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';

const Auth = () => {
  const navigate = useNavigate();
  const user = useUser();

  // Auto-redirect to pitch deck wizard after login
  useEffect(() => {
    if (user) {
      navigate('/pitch-deck-wizard');
    }
  }, [user, navigate]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Medellin AI</h1>
          <p className="text-muted-foreground">
            Sign in to access your dashboard and create presentations
          </p>
        </div>

        <div className="bg-card p-8 rounded-lg border border-border shadow-lg">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#8B5CF6',
                    brandAccent: '#7C3AED',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={window.location.origin + '/dashboard'}
          />
        </div>

        {user && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-center text-sm text-green-800 dark:text-green-200">
              ✅ You are logged in as: <strong>{user.email}</strong>
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-3 w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
