// src/pages/presentations/PresentationEditor.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Save, ArrowLeft } from 'lucide-react';

export default function PresentationEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') fetchPresentation();
    else setLoading(false);
  }, [id]);

  async function fetchPresentation() {
    try {
      const { data, error } = await supabase
        .from('presentations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPresentation(data);
    } catch (error) {
      console.error('Error fetching presentation:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (id === 'new') {
        // Create new presentation
        const { data, error } = await supabase
          .from('presentations')
          .insert({
            title: 'Untitled Presentation',
            profile_id: user.id,
            content: {},
            status: 'draft'
          })
          .select()
          .single();

        if (error) throw error;
        navigate(`/presentations/${data.id}/edit`);
      } else {
        // Update existing
        const { error } = await supabase
          .from('presentations')
          .update({
            content: presentation.content,
            last_edited_at: new Date().toISOString()
          })
          .eq('id', id);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving presentation:', error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8">Loading editor...</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="border-b p-4 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => navigate('/presentations')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-bold">
          {presentation?.title || 'New Presentation'}
        </h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Plate.js Editor Integration Needed
          </h2>
          <p className="text-muted-foreground mb-4">
            This is where the Plate.js rich text editor will be integrated.
            See integration plans for implementation details.
          </p>
          <div className="border rounded-lg p-8 bg-muted">
            <p className="text-sm text-muted-foreground">
              Placeholder for Plate.js editor component
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
