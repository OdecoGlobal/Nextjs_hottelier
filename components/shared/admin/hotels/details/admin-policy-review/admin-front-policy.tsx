import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import { PolicyRow } from '../policy-row';
import AdminSectionWrapper from './policy-section-wrapper';
import { mapStringToLabel } from '@/lib/utils';
import { BOOLEAN_OPTIONS, DAYS_OBJ } from '@/lib/constants';

const AdminFrontDeskReview = () => {
  const { hotel } = useOnboardHotelByIdStore();
  const { policies } = hotel! ?? {};
  const {
    isFrontDesk,
    isFrontDeskEveryDay,
    isFrontDeskOpen24Hours,
    frontDeskEndTime,
    frontDeskScheduleEndDay,
    frontDeskScheduleStartDay,
    frontDeskStartTime,
  } = policies;
  return (
    <AdminSectionWrapper heading="front desk policy">
      <PolicyRow
        label="Do you have a front desk"
        value={mapStringToLabel(String(isFrontDesk), BOOLEAN_OPTIONS)}
      />

      {!isFrontDesk && (
        <>
          <PolicyRow
            label="Is the front desk opened everyday"
            value={mapStringToLabel(
              String(isFrontDeskEveryDay!),
              BOOLEAN_OPTIONS,
            )}
          />
          {!isFrontDeskEveryDay && (
            <>
              <PolicyRow
                label="What's the start day for your front desk"
                value={mapStringToLabel(frontDeskScheduleStartDay!, DAYS_OBJ)}
              />

              <PolicyRow
                label="What's the end day for your front desk"
                value={mapStringToLabel(frontDeskScheduleEndDay!, DAYS_OBJ)}
              />
            </>
          )}
          <PolicyRow
            label="Is the front desk always open 24 hours"
            value={mapStringToLabel(
              String(isFrontDeskOpen24Hours!),
              BOOLEAN_OPTIONS,
            )}
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
        </>
      )}
    </AdminSectionWrapper>
  );
};

export default AdminFrontDeskReview;
