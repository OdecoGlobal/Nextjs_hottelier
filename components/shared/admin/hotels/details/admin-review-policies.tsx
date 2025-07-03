import AdminDialogCard from './dialog-card';
import {
  formatCurrency,
  mapArrayToLabels,
  mapStringToLabel,
} from '@/lib/utils';
import {
  CANCELLATION_FEE_TYPE_OPTIONS,
  CANCELLATION_POLICIES_OPTIONS,
  DAYS_OBJ,
  PAYMENT_METHODS_OPTIONS,
  SELF_CHECK_IN_OPTIONS2,
  SURCHARGE_TYPE_OPTIONS,
} from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import { PolicyRow } from './policy-row';
import MissingStepNotice from './admin-missing-step-notice';

const AdminReviewPolicies = () => {
  const { hotel } = useOnboardHotelByIdStore();
  const { policies, basicInfo } = hotel! ?? {};
  if (!policies) return <MissingStepNotice step="Policies" />;
  if (!basicInfo) return <MissingStepNotice step="Basic information" />;
  const { acceptedCurrency } = basicInfo ?? {};
  console.log(policies);

  const {
    additionalPolicy,
    isTaxIncludedInRoomRates,
    paymentMethods,
    isDepositRequired,
    depositAmount,
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
    checkOutTime,
    selfCheckInType,
    isSelfCheckIn,
    isFrontDesk,
    isFrontDeskEveryDay,
    isFrontDeskOpen24Hours,
    frontDeskEndTime,
    frontDeskScheduleEndDay,
    frontDeskScheduleStartDay,
    frontDeskStartTime,
    cancellationPolicy,
    cancellationFeeType,
    minCheckInAgeAllowed,
  } = policies;
  const paymentArray = mapArrayToLabels(
    paymentMethods,
    PAYMENT_METHODS_OPTIONS,
  );
  return (
    <AdminDialogCard title="Hotel Policies">
      <div className="dialog-div">
        <h3 className="dialog-h3">Payment methods</h3>
        <div className="flex flex-wrap gap-1">
          {paymentArray.map(pay => (
            <Badge key={pay} className="brand-badge">
              {pay}
            </Badge>
          ))}
        </div>
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Deposit Policy</h3>
        <PolicyRow
          label="Is Deposit Required"
          value={isDepositRequired ? 'yes' : 'no'}
        />
        {isDepositRequired && (
          <PolicyRow
            label="Deposit Amount"
            value={formatCurrency(depositAmount, acceptedCurrency)}
          />
        )}
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Tax Policy</h3>
        <PolicyRow
          label="Is tax included on room rates"
          value={isTaxIncludedInRoomRates ? 'yes' : 'no'}
        />
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Cancellation Policy</h3>
        <PolicyRow
          label="Which type of cancellation policy do you have"
          value={mapStringToLabel(
            cancellationPolicy,
            CANCELLATION_POLICIES_OPTIONS,
          )}
        />
        {cancellationPolicy !== 'FREE_CANCELLATION' && cancellationFeeType && (
          <PolicyRow
            label="What type of fees are applied"
            value={mapStringToLabel(
              cancellationFeeType,
              CANCELLATION_FEE_TYPE_OPTIONS,
            )}
          />
        )}
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Check-in Age</h3>
        <PolicyRow
          label="What's the minimum check-in age"
          value={minCheckInAgeAllowed}
        />
      </div>

      <div className="dialog-div">
        <h3 className="dialog-h3">Self check-in policy</h3>
        <PolicyRow
          label="Do you offer self check-in"
          value={isSelfCheckIn ? 'yes' : 'no'}
        />

        {isSelfCheckIn && selfCheckInType && (
          <PolicyRow
            label="Which self check-in method do you offer"
            value={mapStringToLabel(selfCheckInType, SELF_CHECK_IN_OPTIONS2)}
          />
        )}
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Check-in Policy</h3>
        <PolicyRow
          label="Are you opened 24 hours"
          value={isOpen24Hours ? 'Yes' : 'No'}
        />
        {!isOpen24Hours && (
          <div className="space-y-3">
            <PolicyRow
              label="When do your check in start"
              value={checkInStartTime}
            />
            <PolicyRow
              label="When do your check in end"
              value={checkInEndTime}
            />

            <PolicyRow
              label=" Do you charge for late check-in"
              value={isLateCheckIn ? 'Yes' : 'No'}
            />

            {isLateCheckIn && (
              <div className="space-y-3">
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
                        value={formatCurrency(
                          surchargeAmount,
                          acceptedCurrency,
                        )}
                      />
                    </>
                  )}
              </div>
            )}
          </div>
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
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Check-out policy</h3>
        <p>
          When is check-out:{' '}
          <Badge className="brand-badge">{checkOutTime}</Badge>
        </p>
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Front desk policy</h3>
        <PolicyRow
          label="Do you have a front desk"
          value={isFrontDesk ? 'yes' : 'no'}
        />

        {!isFrontDesk && (
          <div className="space-y-4">
            <PolicyRow
              label="Is the front desk opened everyday"
              value={isFrontDeskEveryDay ? 'yes' : 'no'}
            />
            {!isFrontDeskEveryDay &&
              frontDeskScheduleStartDay &&
              frontDeskScheduleEndDay && (
                <>
                  <PolicyRow
                    label="What's the start day for your front desk"
                    value={mapStringToLabel(
                      frontDeskScheduleStartDay,
                      DAYS_OBJ,
                    )}
                  />

                  <PolicyRow
                    label="What's the end day for your front desk"
                    value={mapStringToLabel(frontDeskScheduleEndDay, DAYS_OBJ)}
                  />
                </>
              )}
            <PolicyRow
              label="Is the front desk always available"
              value={isFrontDeskOpen24Hours ? 'yes' : 'no'}
            />

            {!isFrontDeskOpen24Hours &&
              frontDeskStartTime &&
              frontDeskEndTime && (
                <>
                  <PolicyRow
                    label="When do the front desk open"
                    value={frontDeskStartTime}
                  />
                  <PolicyRow
                    label="When do the front desk close"
                    value={frontDeskEndTime}
                  />
                </>
              )}
          </div>
        )}
      </div>
      <div className="dialog-div">
        <h3 className="dialog-h3">Additional Policies</h3>
        {additionalPolicy && additionalPolicy.length > 0 ? (
          <>
            {additionalPolicy.map((policy, i) => (
              <p key={i}> {policy.value}</p>
            ))}
          </>
        ) : (
          <MissingStepNotice
            step="additional policy"
            message="No additional policy"
          />
        )}
      </div>
    </AdminDialogCard>
  );
};

export default AdminReviewPolicies;
