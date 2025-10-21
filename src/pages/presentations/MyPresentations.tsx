// src/pages/presentations/MyPresentations.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Calendar, Trash2, Copy } from 'lucide-react';

interface Presentation {
  id: string;
  title: string;
  description: string;
  status: string;
  slide_count: number;
  last_edited_at: string;
  cover_image_url: string | null;
}

export default function MyPresentations() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, draft: 0, complete: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPresentations();
    fetchStats();
  }, []);

  async function fetchPresentations() {
    try {
      const { data, error } = await supabase
        .from('presentations')
        .select('id, title, description, status, slide_count, last_edited_at, cover_image_url')
        .is('deleted_at', null)
        .order('last_edited_at', { ascending: false });

      if (error) throw error;
      setPresentations(data || []);
    } catch (error) {
      console.error('Error fetching presentations:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .rpc('get_my_presentations_stats', { user_profile_id: user.id });

      if (error) throw error;
      if (data && data.length > 0) {
        setStats({
          total: data[0].total_count || 0,
          draft: data[0].draft_count || 0,
          complete: data[0].complete_count || 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this presentation?')) return;

    try {
      const { error } = await supabase
        .rpc('soft_delete_presentation', { presentation_id: id });

      if (error) throw error;
      fetchPresentations();
      fetchStats();
    } catch (error) {
      console.error('Error deleting presentation:', error);
    }
  }

  async function handleDuplicate(id: string) {
    try {
      const { data: newId, error } = await supabase
        .rpc('duplicate_presentation', { source_id: id });

      if (error) throw error;
      fetchPresentations();
    } catch (error) {
      console.error('Error duplicating presentation:', error);
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Presentations</h1>
          <p className="text-muted-foreground">
            {stats.total} total • {stats.draft} drafts • {stats.complete} completed
          </p>
        </div>
        <Button onClick={() => navigate('/presentations/new/edit')}>
          <Plus className="mr-2 h-4 w-4" />
          New Presentation
        </Button>
      </div>

      {/* Presentations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {presentations.map((presentation) => (
          <Card
            key={presentation.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/presentations/${presentation.id}`)}
          >
            <CardHeader>
              {presentation.cover_image_url ? (
                <img
                  src={presentation.cover_image_url}
                  alt={presentation.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
              <CardTitle>{presentation.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {presentation.description || 'No description'}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span className="flex items-center">
                  <FileText className="mr-1 h-3 w-3" />
                  {presentation.slide_count} slides
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(presentation.last_edited_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDuplicate(presentation.id);
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(presentation.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {presentations.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No presentations yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first presentation to get started
          </p>
          <Button onClick={() => navigate('/presentations/new/edit')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Presentation
          </Button>
        </div>
      )}
    </div>
  );
}
