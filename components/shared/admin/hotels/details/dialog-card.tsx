import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDialogCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle className="border-b-2 border-b-glow font-bold text-xl pb-1 capitalize">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2">{children}</CardContent>
    </Card>
  );
};

export default AdminDialogCard;
