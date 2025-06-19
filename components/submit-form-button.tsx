import { Loader } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type SubmitFormButtonProps = {
  isPending: boolean;
  className?: string;
  action: string;
  showSteps?: boolean;
  currentStep?: number;
  totalSteps?: number;
  onPrevious?: () => void;
  showPrevious?: boolean;
};

const SubmitFormButton = ({
  isPending,
  className,
  action,
  showSteps = false,
  currentStep,
  totalSteps,
  onPrevious,
  showPrevious = false,
}: SubmitFormButtonProps) => {
  return (
    <div className={cn('flex items-center justify-between w-full', className)}>
      {showPrevious ? (
        <Button
          type="button"
          onClick={onPrevious}
          variant="outline"
          className="rounded-full"
        >
          Previous
        </Button>
      ) : (
        <div />
      )}
      {showSteps ? (
        <p className="text-sm font-semibold text-center">
          {currentStep} of {totalSteps}
        </p>
      ) : (
        <div />
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-blue-600 text-slate-50 hover:text-slate-100 hover:bg-blue-700"
      >
        {isPending ? <Loader className="w-4 h-4 animate-spin" /> : action}
      </Button>
    </div>
  );
};

export default SubmitFormButton;
