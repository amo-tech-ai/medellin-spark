// src/pages/presentations/PresentationView.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Edit, Share2, Download } from 'lucide-react';

export default function PresentationView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchPresentation();
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

  if (loading) return <div className="p-8">Loading presentation...</div>;
  if (!presentation) return <div className="p-8">Presentation not found</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{presentation.title}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/presentations/${id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Presentation View Area */}
      <div className="flex-1 bg-muted p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg aspect-video p-8">
          <h2 className="text-2xl font-bold mb-4">
            Presentation Viewer (Plate.js Integration Needed)
          </h2>
          <p className="text-muted-foreground">
            This will render the Plate.js editor in read-only mode
          </p>
          <pre className="mt-4 p-4 bg-muted rounded text-xs overflow-auto">
            {JSON.stringify(presentation, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
