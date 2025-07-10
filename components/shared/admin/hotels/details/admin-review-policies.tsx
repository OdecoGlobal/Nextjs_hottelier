import AdminDialogCard from './dialog-card';
import {
  formatCurrency,
  mapArrayToLabels,
  mapStringToLabel,
} from '@/lib/utils';
import {
  CANCELLATION_FEE_TYPE_OPTIONS,
  CANCELLATION_POLICIES_OPTIONS,
  PAYMENT_METHODS_OPTIONS,
  SELF_CHECK_IN_OPTIONS2,
  TIME_SLOTS_STANDARD,
} from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import { PolicyRow } from './policy-row';
import MissingStepNotice from '../../../missing-info';
import AdminFrontDeskReview from './admin-policy-review/admin-front-policy';
import AdminSectionWrapper from './admin-policy-review/policy-section-wrapper';
import AdminPetPolicyReview from './admin-policy-review/admin-pet-policy-review';
import AdminCheckInPolicyReview from './admin-policy-review/admin-check-in';
import { mapBooleanToString } from '@/utils/value-label';

const AdminReviewPolicies = () => {
  const { hotel } = useOnboardHotelByIdStore();
  const { policies, basicInfo } = hotel! ?? {};
  if (!policies || !basicInfo) return <MissingStepNotice step="Policies" />;
  const { acceptedCurrency } = basicInfo ?? {};

  const {
    additionalPolicy,
    isTaxIncludedInRoomRates,
    paymentMethods,
    isDepositRequired,
    depositAmount,
    checkOutTime,
    selfCheckInType,
    isSelfCheckIn,
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
      <AdminSectionWrapper heading="Payment methods">
        <div className="flex flex-wrap gap-1">
          {paymentArray.map(pay => (
            <Badge key={pay} className="brand-badge">
              {pay}
            </Badge>
          ))}
        </div>
      </AdminSectionWrapper>

      <AdminSectionWrapper heading="Deposit Policy">
        <PolicyRow
          label="Is Deposit Required"
          value={mapBooleanToString(isDepositRequired)}
        />
        {isDepositRequired && (
          <PolicyRow
            label="Deposit Amount"
            value={formatCurrency(depositAmount, acceptedCurrency)}
          />
        )}
      </AdminSectionWrapper>
      <AdminSectionWrapper heading="Tax Policy">
        <PolicyRow
          label="Is tax included on room rates"
          value={mapBooleanToString(isTaxIncludedInRoomRates)}
        />
      </AdminSectionWrapper>

      <AdminSectionWrapper heading="Cancellation Policy">
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
      </AdminSectionWrapper>
      <AdminSectionWrapper heading="Check-in Age">
        <PolicyRow
          label="What's the minimum check-in age"
          value={minCheckInAgeAllowed}
        />
      </AdminSectionWrapper>

      <AdminSectionWrapper heading="Self check-in policy">
        <PolicyRow
          label="Do you offer self check-in"
          value={mapBooleanToString(isSelfCheckIn)}
        />

        {isSelfCheckIn && selfCheckInType && (
          <PolicyRow
            label="Which self check-in method do you offer"
            value={mapStringToLabel(selfCheckInType, SELF_CHECK_IN_OPTIONS2)}
          />
        )}
      </AdminSectionWrapper>
      <AdminCheckInPolicyReview />

      <AdminSectionWrapper heading="Check-out policy">
        <PolicyRow
          label=" When is check-out"
          value={mapStringToLabel(checkOutTime, TIME_SLOTS_STANDARD)}
        />
      </AdminSectionWrapper>

      <AdminFrontDeskReview />
      <AdminPetPolicyReview />

      <AdminSectionWrapper heading="Additional Policies">
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
      </AdminSectionWrapper>
    </AdminDialogCard>
  );
};

export default AdminReviewPolicies;
