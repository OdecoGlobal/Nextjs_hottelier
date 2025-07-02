import { HotelStatusType } from '@/types';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

const StatusBadge = ({ status }: { status: HotelStatusType }) => {
  return (
    <Badge
      className={cn(
        'capitalize',
        status === 'DRAFT'
          ? 'bg-gray-100 text-gray-800'
          : status === 'IN_PROGRESS'
            ? 'bg-blue-100 text-blue-800'
            : status === 'PENDING_REVIEW'
              ? 'bg-yellow-100 text-yellow-800'
              : status === 'APPROVED'
                ? 'bg-green-100 text-green-800'
                : status === 'ACTIVE'
                  ? 'bg-emerald-100 text-emerald-800'
                  : status === 'INACTIVE'
                    ? 'bg-slate-100 text-slate-800'
                    : '',
      )}
    >
      {status.replace('_', ' ')}
    </Badge>
  );
};

export default StatusBadge;
