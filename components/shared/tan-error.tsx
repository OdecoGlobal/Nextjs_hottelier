import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

const TanStackErrorComponent = ({
  message = 'Unable to load data',
  description = 'Something went wrong while fetching the data',
  onRetry,
}: {
  message?: string;
  description?: string;
  onRetry: () => void;
}) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex-shrink-0">
        <AlertCircle className="w-5 h-5 text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-red-800">{message}</p>
        <p className="text-sm text-red-600 mt-1">{description}</p>
      </div>
      <Button
        onClick={onRetry}
        className="text-red-700 bg-red-100 hover:bg-red-200 border border-red-300 rounded-md transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Retry
      </Button>
    </div>
  );
};

export default TanStackErrorComponent;
