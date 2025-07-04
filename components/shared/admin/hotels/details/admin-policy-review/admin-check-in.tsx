import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import { PolicyRow } from '../policy-row';
import { formatCurrency, mapStringToLabel } from '@/lib/utils';
import { SURCHARGE_TYPE_OPTIONS } from '@/lib/constants';
import AdminSectionWrapper from './policy-section-wrapper';

const AdminPolicyReview = () => {
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
        label="Are you opened 24 hours"
        value={isOpen24Hours ? 'Yes' : 'No'}
      />

      {isOpen24Hours && (
        <>
          <PolicyRow
            label="When do your check in start"
            value={checkInStartTime}
          />
          <PolicyRow label="When do your check in end" value={checkInEndTime} />
          <PolicyRow
            label=" Do you charge for late check-in"
            value={isLateCheckIn ? 'Yes' : 'No'}
          />
          {isLateCheckIn && (
            <>
              <PolicyRow
                label="What's your late check-in type"
                value={lateCheckInType}
              />
              <PolicyRow
                label="When do your late check in start"
                value={lateCheckInStartTime}
              />
              <PolicyRow
                label="When do your late check in end"
                value={lateCheckInEndTime}
              />
              {lateCheckInType === 'SURCHARGE' &&
                surchargeType &&
                surchargeAmount && (
                  <>
                    <PolicyRow
                      label="How do you surcharge for late check-in"
                      value={mapStringToLabel(
                        surchargeType,
                        SURCHARGE_TYPE_OPTIONS,
                      )}
                    />
                    <PolicyRow
                      label="Late check-in surcharge fee"
                      value={formatCurrency(surchargeAmount, acceptedCurrency)}
                    />
                  </>
                )}
            </>
          )}
        </>
      )}

      <PolicyRow
        label=" Do you allow for advance notice before check-in"
        value={isAdvancedNoticeCheckIn ? 'Yes' : 'No'}
      />

      {isAdvancedNoticeCheckIn && advanceNoticeCheckInTime && (
        <PolicyRow
          label="When do you allow for advanced notice"
          value={advanceNoticeCheckInTime}
        />
      )}
    </AdminSectionWrapper>
  );
};

export default AdminPolicyReview;
