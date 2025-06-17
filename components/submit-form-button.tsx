import { Loader } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const SubmitFormButton = ({
  isPending,
  className,
  action,
}: {
  isPending: boolean;
  className?: string;
  action: string;
}) => {
  return (
    <div className={cn(className)}>
      <Button type="submit" disabled={isPending}>
        {isPending ? <Loader className="w-4 h-4 animate-spin" /> : action}
      </Button>
    </div>
  );
};

export default SubmitFormButton;
