import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import { PolicyRow } from '../policy-row';
import AdminSectionWrapper from './policy-section-wrapper';
import {
  formatCurrency,
  mapArrayToLabels,
  mapStringToLabel,
} from '@/lib/utils';
import {
  ALLOWED_PET_OPTIONS,
  PET_FEE_DURATION_OPTIONS,
  PET_FRIENDLY_FEATURES_OPTIONS,
  PET_SURCHARGE_TYPE_OPTIONS,
} from '@/lib/constants';
import { GeneratedTypes } from '@/types';
import { Badge } from '@/components/ui/badge';

const AdminPetPolicyReview = () => {
  const { hotel } = useOnboardHotelByIdStore();
  const { policies, basicInfo } = hotel! ?? {};
  const { acceptedCurrency } = basicInfo;
  const {
    isPetAllowed,
    isPetSurcharged,
    petSurchargeAmount,
    petSurchargeDuration,
    petSurchargeType,
    isPetFeeVaried,
    isMaxFeePerStay,
    maxFeePerStayAmount,
    allowedPetType,
    petMaxWeight,
    petRestrictionType,
    isPetRestricted,
    isMaxWeightPerPet,
    petCleaningFee,
    petDepositAmount,
    petDepositType,
    petFriendlyFeatures,
    isPetCleaningFee,
    isPetDeposit,
  } = policies;

  const friendlyFeatures =
    petFriendlyFeatures &&
    mapArrayToLabels(petFriendlyFeatures, PET_FRIENDLY_FEATURES_OPTIONS);
  return (
    <AdminSectionWrapper heading="Pet Policy">
      <PolicyRow label="Are pets allowed" value={isPetAllowed ? 'yes' : 'no'} />
      {!isPetAllowed && (
        <>
          <PolicyRow
            label="Do you surchage for pets"
            value={isPetSurcharged ? 'yes' : 'no'}
          />
          {isPetSurcharged && (
            <>
              {petSurchargeAmount && (
                <PolicyRow
                  label="How much do you charge for pet"
                  value={formatCurrency(petSurchargeAmount, acceptedCurrency)}
                />
              )}
              {petSurchargeType && (
                <PolicyRow
                  label="How do you surcharge for pets"
                  value={mapStringToLabel(
                    petSurchargeType,
                    PET_SURCHARGE_TYPE_OPTIONS,
                  )}
                />
              )}

              {petSurchargeDuration && (
                <PolicyRow
                  label="How long do you surcharge for pets"
                  value={mapStringToLabel(
                    petSurchargeDuration,
                    PET_FEE_DURATION_OPTIONS,
                  )}
                />
              )}
              <PolicyRow
                label="Is there a maximum fee for pet"
                value={isMaxFeePerStay ? 'yes' : 'no'}
              />
              {isMaxFeePerStay && maxFeePerStayAmount && (
                <PolicyRow
                  label="What is the max fee per pet"
                  value={formatCurrency(maxFeePerStayAmount, acceptedCurrency)}
                />
              )}
              <PolicyRow
                label="Does the fee vary base on length of stay"
                value={isPetFeeVaried ? 'yes' : 'no'}
              />
            </>
          )}
          {allowedPetType && (
            <PolicyRow
              label="What type of pet(s) are allowed"
              value={mapStringToLabel(allowedPetType, ALLOWED_PET_OPTIONS)}
            />
          )}
          <PolicyRow
            label="Are pets restricted"
            value={isPetRestricted ? 'yes' : 'no'}
          />
          {isPetRestricted && (
            <>
              <PolicyRow
                label="Do you have a maximum accepted weight for pet"
                value={isMaxWeightPerPet ? 'yes' : 'no'}
              />

              {isMaxWeightPerPet && petMaxWeight && (
                <PolicyRow
                  label="Whats the maximum weight in kg"
                  value={`${petMaxWeight.toFixed(2)} kg`}
                />
              )}
              {petRestrictionType && petRestrictionType.length > 0 && (
                <div className="dialog-div">
                  <p>What type of pet restriction do you have</p>
                  {petRestrictionType.map(type => {
                    const typeOption: GeneratedTypes[] = [
                      {
                        label: 'Pets are allowed in specific rooms only',
                        value: 'ONLY_SPECIFIC_AREAS',
                      },
                      {
                        label: 'Pets cannot be left unattended',
                        value: 'CANNOT_BE_LEFT_UNATTENDED',
                      },
                      {
                        label: 'Pets are allowed in smoking rooms only',
                        value: 'ONLY_SMOKING_ROOMS',
                      },
                      {
                        label: 'Other pet restrictions apply',
                        value: 'OTHERS',
                      },
                    ];

                    return (
                      <p className="brand-badge" key={type}>
                        {mapStringToLabel(type, typeOption)}
                      </p>
                    );
                  })}
                </div>
              )}
            </>
          )}

          <PolicyRow
            label="Must guest pay a refundable deposit for pet damages"
            value={isPetDeposit ? 'yes' : 'no'}
          />
          {!isPetDeposit && (
            <>
              {petDepositAmount && (
                <PolicyRow
                  label="What is the deposit amount"
                  value={formatCurrency(petDepositAmount, acceptedCurrency)}
                />
              )}
              {petDepositType && (
                <PolicyRow
                  label="What duration do you charge base on"
                  value={mapStringToLabel(
                    petDepositType,
                    PET_FEE_DURATION_OPTIONS,
                  )}
                />
              )}
            </>
          )}
          <PolicyRow
            label="Is there a fee for cleaning pet"
            value={isPetCleaningFee ? 'yes' : 'no'}
          />

          {isPetCleaningFee && petCleaningFee && (
            <PolicyRow
              label="What is the pet cleaning fee a"
              value={formatCurrency(petCleaningFee, acceptedCurrency)}
            />
          )}
          {friendlyFeatures &&
            friendlyFeatures.length > 0 &&
            friendlyFeatures.map(feature => (
              <Badge key={feature} className="brand-badge">
                {feature}
              </Badge>
            ))}
        </>
      )}
    </AdminSectionWrapper>
  );
};

export default AdminPetPolicyReview;
