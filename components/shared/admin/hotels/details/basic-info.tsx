'use client';
import StatusBadge from '@/components/status-badge';

import AdminDialogCard from './dialog-card';
import { ACCEPTED_CURRENCIES, HOTEL_TYPES_OPTIONS } from '@/lib/constants';
import { mapStringToLabel } from '@/lib/utils';
import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import MissingStepNotice from './admin-missing-step-notice';

const AdminOnboardBasicInfo = () => {
  const { hotel } = useOnboardHotelByIdStore();
  const { basicInfo, status, name } = hotel! ?? {};

  if (!basicInfo || !status || !name)
    return <MissingStepNotice step="Basic information" />;
  const {
    address,
    acceptedCurrency,
    city,
    state,
    country,
    roomUnitTotal,
    hotelType,
  } = basicInfo;
  return (
    <AdminDialogCard title="Basic Information">
      <div className="dialog-div">
        <h3 className="dialog-h3">Hotel Name</h3>
        <p>{name}</p>
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Type</h3>
        <p>{mapStringToLabel(hotelType, HOTEL_TYPES_OPTIONS)}</p>
      </div>

      <div className="dialog-div">
        <h3 className="dialog-h3">Location</h3>
        <p>
          {address}, {city}, {state}, {country}
        </p>
      </div>

      <div className="dialog-div">
        <h3 className="dialog-h3">Total Rooms</h3>
        <p>{roomUnitTotal}</p>
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Accepted currency</h3>
        <p>{mapStringToLabel(acceptedCurrency, ACCEPTED_CURRENCIES)}</p>
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Status</h3>
        <StatusBadge status={status} />
      </div>
    </AdminDialogCard>
  );
};

export default AdminOnboardBasicInfo;
