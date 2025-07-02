'use client';
import LoadingComponent from '@/components/loading-state';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useOnboardHotelById } from '@/hooks/use-onboard-hotels';

import { Edit, X } from 'lucide-react';
import AdminOnboardBasicInfo from './details/basic-info';

const AdminHotelReviewDialog = ({ hotelId }: { hotelId: string }) => {
  const { data, isPending, error } = useOnboardHotelById({ hotelId });
  if (isPending) {
    return <LoadingComponent />;
  }
  if (error) {
    return <div>An error occured while getting data {error.message}</div>;
  }
  const { hotel } = data;
  const { basicInfo, name, status } = hotel;
  return (
    <Dialog>
      <DialogTitle />
      <DialogTrigger className="w-fit p-2 rounded-lg bg-brand-primary-200">
        <Edit className="w-6 h-6" />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[90vw] md:max-w-[80vw] lg:max-w-5xl w-full max-h-[90vh] overflow-y-auto pt-0"
      >
        <DialogHeader className="bg-linear-(--gradient-200) sticky top-0 z-0 pt-6 px-6 -mx-6">
          <DialogClose>
            <X className="w-6 h-6 text-slate-50 hover:text-slate-200 ml-auto" />
          </DialogClose>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-brand-secondary">
            {name}
          </DialogTitle>
          <DialogDescription className="text-slate-50 text-base">
            Review Details
          </DialogDescription>
        </DialogHeader>
        <AdminOnboardBasicInfo basicInfo={basicInfo} status={status} />
      </DialogContent>
    </Dialog>
  );
};

export default AdminHotelReviewDialog;
