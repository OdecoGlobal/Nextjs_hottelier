'use client';
import { useState, useTransition } from 'react';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
const DeleteDialog = ({
  action,
  className,
}: {
  action: () => Promise<{ success: boolean; message: string }>;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action();
      if (!res.success) {
        toast({
          title: 'Error',
          description: res.message,
          variant: 'destructive',
        });
      } else {
        setOpen(false);
        toast({
          title: 'Success',
          description: res.message,
        });
        router.refresh();
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={cn('ml-2', className)}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can&apos;t be undone
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              variant="destructive"
              size="sm"
              disabled={isPending}
              onClick={handleDeleteClick}
            >
              {isPending ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                'Delete'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
