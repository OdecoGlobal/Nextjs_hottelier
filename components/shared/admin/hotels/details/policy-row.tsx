import { Badge } from '@/components/ui/badge';

export const PolicyRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | React.ReactNode;
}) => (
  <div className="dialog-div ">
    <p>
      {label}:{' '}
      <Badge className="brand-badge">
        {typeof value === 'string' || typeof value === 'number' ? value : value}
      </Badge>
    </p>
  </div>
);
