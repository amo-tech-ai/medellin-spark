import { Navigate } from 'react-router-dom';

/**
 * Dev Mode Redirect Component
 * Redirects to homepage in development, shows actual page in production
 */
export function DevModeRedirect({ 
  children, 
  devRedirectTo = "/" 
}: { 
  children: React.ReactNode;
  devRedirectTo?: string;
}) {
  // In development: redirect to specified route
  if (import.meta.env.DEV) {
    return <Navigate to={devRedirectTo} replace />;
  }

  // In production: show actual page
  return <>{children}</>;
}

