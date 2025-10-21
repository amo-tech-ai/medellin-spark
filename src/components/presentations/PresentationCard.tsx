// ==================================================
// PresentationCard Component - Adapted from reference-presentation-ai
// ==================================================
// Individual presentation card with actions (edit, duplicate, delete, share)
// Reference: /reference-presentation-ai/src/components/presentation/dashboard/PresentationItem.tsx
// Adapted for: Vite + React Router + Supabase (from Next.js + Prisma)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Edit,
  Copy,
  Share2,
  Trash2,
  EllipsisVertical,
  Presentation,
  Loader2,
  Check,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { usePresentationsStore } from '@/stores/presentations.store';
import type { PresentationCardProps } from '@/types/presentations.types';

// ==================================================
// COMPONENT
// ==================================================

export const PresentationCard = ({
  presentation,
  onEdit,
  onDuplicate,
  onDelete,
  onShare,
  isSelecting = false,
  onSelect,
  isSelected = false,
  className = '',
}: PresentationCardProps & {
  isSelecting?: boolean;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);

  const deletePresentation = usePresentationsStore((state) => state.deletePresentation);
  const duplicatePresentation = usePresentationsStore((state) => state.duplicatePresentation);

  /**
   * Handle card click - navigate to editor or generator based on content
   */
  const handleClick = async (e: React.MouseEvent) => {
    if (isSelecting && onSelect) {
      e.preventDefault();
      onSelect(presentation.id);
      return;
    }

    try {
      setIsNavigating(true);

      // Route based on content status and slide count
      if (presentation.slide_count > 0) {
        // Navigate to presentation editor
        navigate(`/presentation/${presentation.id}`);
      } else {
        // Navigate to generation wizard
        navigate(`/presentation/generate/${presentation.id}`);
      }
    } catch (error) {
      console.error('Failed to navigate:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to open presentation',
      });
    } finally {
      setIsNavigating(false);
    }
  };

  /**
   * Handle delete with confirmation
   */
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePresentation(presentation.id);
      setIsDeleteDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Presentation deleted successfully',
      });
    } catch (error) {
      console.error('Failed to delete presentation:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete presentation',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Handle duplicate
   */
  const handleDuplicate = async () => {
    try {
      setIsDuplicating(true);
      await duplicatePresentation(presentation.id);
      toast({
        title: 'Success',
        description: 'Presentation duplicated successfully',
      });
    } catch (error) {
      console.error('Failed to duplicate presentation:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to duplicate presentation',
      });
    } finally {
      setIsDuplicating(false);
    }
  };

  /**
   * Handle rename - use Edit tool or inline editing
   */
  const handleRename = () => {
    const newTitle = prompt('Enter new title', presentation.title || '');
    if (newTitle && newTitle !== presentation.title) {
      onEdit(presentation.id); // Navigate to edit with focus on title
    }
  };

  const isLoading = isNavigating;

  return (
    <>
      <div
        className={cn(
          'group relative flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent/5',
          isSelected && 'ring-2 ring-primary',
          isLoading && 'pointer-events-none opacity-70',
          className
        )}
      >
        <div className="flex w-full items-center gap-3" onClick={handleClick}>
          {/* Selection checkbox (for bulk actions) */}
          {isSelecting ? (
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full border',
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-background'
              )}
            >
              {isSelected && <Check className="h-3 w-3" />}
            </div>
          ) : (
            /* Thumbnail or Icon */
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 overflow-hidden">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : presentation.thumbnail_url || presentation.cover_image_url ? (
                <img
                  src={presentation.thumbnail_url || presentation.cover_image_url}
                  alt="Presentation thumbnail"
                  className="h-10 w-10 object-cover"
                />
              ) : (
                <Presentation className="h-5 w-5 text-primary" />
              )}
            </div>
          )}

          {/* Title and metadata */}
          <div>
            <h3 className="font-medium text-foreground">
              {isLoading ? 'Loading...' : presentation.title || 'Untitled'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? 'Loading...'
                : new Date(presentation.last_edited_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Actions dropdown (hidden in selection mode) */}
        {!isSelecting && (
          <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <EllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleRename}>
                  <Edit className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDuplicate();
                  }}
                  disabled={isDuplicating}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {isDuplicating ? 'Duplicating...' : 'Duplicate'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare(presentation.id);
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteDialogOpen(true);
                  }}
                  disabled={isDeleting}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              presentation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
