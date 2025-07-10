'use client';
import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import AdminDialogCard from './dialog-card';
import AdminSectionWrapper from './admin-policy-review/policy-section-wrapper';
import { PolicyRow } from './policy-row';
import { formatCurrency, mapStringToLabel } from '@/lib/utils';
import {
  BOOLEAN_OPTIONS,
  BREAKFAST_SCHEDULE_OPTIONS,
  HOTEL_CHARGE_OPTION,
  TIME_SLOTS_STANDARD,
  TIME_SLOTS_WITH_NEXT_DAY,
} from '@/lib/constants';
import MissingStepNotice from '../../../missing-info';

const AdminReviewAmenities = () => {
  const { hotel } = useOnboardHotelByIdStore();
  const { amenities, basicInfo } = hotel! ?? {};
  if (!amenities || !basicInfo) return <MissingStepNotice step="amenities" />;
  const { acceptedCurrency } = basicInfo;
  const {
    breakfastChargeType,
    breakfastEndTime,
    breakfastSchedule,
    breakfastStartTime,
    isBreakfast,
    breakfastSurchargeAmount,
  } = amenities;

  return (
    <AdminDialogCard title="Hotel Amenities">
      <AdminSectionWrapper heading="Breakfast">
        <PolicyRow
          label="Do you offer breakfast"
          value={mapStringToLabel(String(isBreakfast), BOOLEAN_OPTIONS)}
        />
        {isBreakfast && (
          <>
            <PolicyRow
              label="What type of charge is applied for breakfast"
              value={mapStringToLabel(
                breakfastChargeType!,
                HOTEL_CHARGE_OPTION,
              )}
            />
            {breakfastChargeType === 'SURCHARGE' && (
              <PolicyRow
                label="How much is surcharged for breakfast"
                value={formatCurrency(
                  breakfastSurchargeAmount!,
                  acceptedCurrency,
                )}
              />
            )}

            <PolicyRow
              label="What is your breakfast schedule"
              value={mapStringToLabel(
                breakfastSchedule!,
                BREAKFAST_SCHEDULE_OPTIONS,
              )}
            />

            <PolicyRow
              label="When does the breakfast start"
              value={mapStringToLabel(breakfastStartTime!, TIME_SLOTS_STANDARD)}
            />
            <PolicyRow
              label="When does the breakfast end"
              value={mapStringToLabel(
                breakfastEndTime!,
                TIME_SLOTS_WITH_NEXT_DAY,
              )}
            />
          </>
        )}
      </AdminSectionWrapper>
    </AdminDialogCard>
  );
};

export default AdminReviewAmenities;
