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
import AdminReviewPolicies from './details/admin-review-policies';
import TanStackErrorComponent from '../../tan-error';

const AdminHotelReviewDialog = ({ hotelId }: { hotelId: string }) => {
  const { data, isPending, error, refetch } = useOnboardHotelById({ hotelId });

  return (
    <Dialog>
      <DialogTitle />
      <DialogTrigger className="w-fit p-2 rounded-lg bg-brand-primary-200">
        <Edit className="w-6 h-6" />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="h-full overflow-y-scroll pt-0 md:max-w-3xl"
      >
        <DialogHeader className="bg-linear-(--gradient-200)  px-6 -mx-6">
          <DialogClose className=" mt-2 w-fit ml-auto cursor-pointer">
            <X className="w-4 h-4 text-slate-50 hover:text-slate-200 " />
          </DialogClose>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-brand-secondary">
            Hotel Review
          </DialogTitle>
          <DialogDescription className="text-slate-50 text-base">
            Review Details
          </DialogDescription>
        </DialogHeader>

        {isPending && <LoadingComponent />}
        {error && <TanStackErrorComponent onRetry={() => refetch()} />}
        {!isPending && !error && data?.hotel && (
          <>
            <AdminOnboardBasicInfo />
            <AdminReviewPolicies />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminHotelReviewDialog;
