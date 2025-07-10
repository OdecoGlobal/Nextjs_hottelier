import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import { PolicyRow } from '../policy-row';
import { formatCurrency, mapStringToLabel } from '@/lib/utils';
import {
  BOOLEAN_OPTIONS,
  HOTEL_CHARGE_OPTION,
  SURCHARGE_TYPE_OPTIONS,
  TIME_SLOTS_STANDARD,
  TIME_SLOTS_WITH_NEXT_DAY,
} from '@/lib/constants';
import AdminSectionWrapper from './policy-section-wrapper';
import { mapBooleanToString } from '@/utils/value-label';

const AdminCheckInPolicyReview = () => {
  const { hotel } = useOnboardHotelByIdStore();
  const { policies, basicInfo } = hotel! ?? {};
  const { acceptedCurrency } = basicInfo ?? {};

  const {
    checkInStartTime,
    checkInEndTime,
    isOpen24Hours,
    lateCheckInEndTime,
    lateCheckInStartTime,
    isLateCheckIn,
    lateCheckInType,
    isAdvancedNoticeCheckIn,
    advanceNoticeCheckInTime,
    surchargeAmount,
    surchargeType,
  } = policies;
  return (
    <AdminSectionWrapper heading="Check-in Policy">
      <PolicyRow
        label="When do your check in start"
        value={mapStringToLabel(checkInStartTime, TIME_SLOTS_STANDARD)}
      />

      <PolicyRow
        label="Are you opened 24 hours"
        value={mapBooleanToString(isOpen24Hours)}
      />

      {isOpen24Hours && (
        <>
          <PolicyRow
            label="When do your check in end"
            value={mapStringToLabel(checkInEndTime!, TIME_SLOTS_WITH_NEXT_DAY)}
          />
          <PolicyRow
            label=" Do you charge for late check-in"
            value={mapStringToLabel(String(isLateCheckIn), BOOLEAN_OPTIONS)}
          />
          {isLateCheckIn && (
            <>
              <PolicyRow
                label="What's your late check-in type"
                value={mapStringToLabel(lateCheckInType!, HOTEL_CHARGE_OPTION)}
              />
              <PolicyRow
                label="When do your late check in start"
                value={mapStringToLabel(
                  lateCheckInStartTime!,
                  TIME_SLOTS_STANDARD,
                )}
              />
              <PolicyRow
                label="When do your late check in end"
                value={mapStringToLabel(
                  lateCheckInEndTime!,
                  TIME_SLOTS_WITH_NEXT_DAY,
                )}
              />
              {lateCheckInType === 'SURCHARGE' && (
                <>
                  <PolicyRow
                    label="How do you surcharge for late check-in"
                    value={mapStringToLabel(
                      surchargeType!,
                      SURCHARGE_TYPE_OPTIONS,
                    )}
                  />
                  <PolicyRow
                    label="Late check-in surcharge fee"
                    value={formatCurrency(surchargeAmount!, acceptedCurrency)}
                  />
                </>
              )}
            </>
          )}
        </>
      )}

      <PolicyRow
        label=" Do you allow for advance notice before check-in"
        value={mapStringToLabel(
          String(isAdvancedNoticeCheckIn),
          BOOLEAN_OPTIONS,
        )}
      />

      {isAdvancedNoticeCheckIn && (
        <PolicyRow
          label="When do you allow for advanced notice"
          value={mapStringToLabel(
            advanceNoticeCheckInTime!,
            TIME_SLOTS_STANDARD,
          )}
        />
      )}
    </AdminSectionWrapper>
  );
};

export default AdminCheckInPolicyReview;
