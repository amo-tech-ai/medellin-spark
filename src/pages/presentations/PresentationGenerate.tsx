// src/pages/presentations/PresentationGenerate.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';

export default function PresentationGenerate() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;

    setGenerating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create presentation record
      const { data: presentation, error: createError } = await supabase
        .from('presentations')
        .insert({
          title: 'AI Generated Presentation',
          profile_id: user.id,
          prompt: prompt,
          status: 'generating',
          content: {}
        })
        .select()
        .single();

      if (createError) throw createError;

      // Call Edge Function for AI generation
      // TODO: Implement Edge Function call
      // const { data, error } = await supabase.functions.invoke('generate-presentation', {
      //   body: { prompt, presentationId: presentation.id }
      // });

      // For now, redirect to editor
      navigate(`/presentations/${presentation.id}/edit`);
    } catch (error) {
      console.error('Error generating presentation:', error);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <div className="text-center mb-8">
        <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold mb-2">
          Generate Presentation with AI
        </h1>
        <p className="text-muted-foreground">
          Describe your presentation and let AI create it for you
        </p>
      </div>

      <div className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Create a pitch deck for a SaaS startup that helps remote teams collaborate..."
          rows={8}
          className="resize-none"
        />

        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || generating}
          className="w-full"
          size="lg"
        >
          {generating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Presentation
            </>
          )}
        </Button>
      </div>

      <div className="mt-8 p-4 border rounded-lg bg-muted">
        <h3 className="font-semibold mb-2">Note:</h3>
        <p className="text-sm text-muted-foreground">
          AI generation requires Edge Function integration.
          See integration plans for implementation details.
        </p>
      </div>
    </div>
  );
}
