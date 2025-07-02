import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { getOnboardHotelById } from '@/lib/actions/hotel.action';
import { Edit } from 'lucide-react';

const AdminHotelReviewDialog = async ({ id }: { id: string }) => {
  const { hotel } = await getOnboardHotelById(id);
  console.log(hotel);

  return (
    <Dialog>
      <DialogTrigger className="bg-brand-secondary w-fit p-2 rounded-lg">
        <Edit className="w-6 h-6" />
      </DialogTrigger>
      <DialogContent>
        <h1>Hotel</h1>
      </DialogContent>
    </Dialog>
  );
};

export default AdminHotelReviewDialog;
