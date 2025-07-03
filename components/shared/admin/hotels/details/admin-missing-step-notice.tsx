import { FileWarning } from 'lucide-react';

interface MissingStepNoticeProps {
  step: string;
  message?: string;
}

const MissingStepNotice = ({ step, message }: MissingStepNoticeProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground border border-dashed rounded-xl">
      <FileWarning className="w-10 h-10 mb-4 text-destructive" />
      <p className="text-base font-medium">
        {message || `No ${step} submitted yet.`}
      </p>
    </div>
  );
};

export default MissingStepNotice;
