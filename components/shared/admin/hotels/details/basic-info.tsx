'use client';
import StatusBadge from '@/components/status-badge';

import { BasicInfo, HotelStatusType } from '@/types';
import AdminDialogCard from './dialog-card';

const AdminOnboardBasicInfo = ({
  basicInfo,
  status,
}: {
  basicInfo: BasicInfo;
  status: HotelStatusType;
}) => {
  const {
    name,
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
        <p>{hotelType}</p>
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
        <p>{acceptedCurrency}</p>
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Status</h3>
        <StatusBadge status={status} />
      </div>
    </AdminDialogCard>
  );
};

export default AdminOnboardBasicInfo;
