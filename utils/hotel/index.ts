import { prisma } from '@/db/prisma';
import AppError from '@/lib/errors/app-error';

type StepKey =
  | 'step1_basic_info'
  | 'step2_policies'
  | 'step3_amenities'
  | 'step4_hotel_images'
  | 'step5_rooms'
  | 'step6_rate_and_availability'
  | 'step7_review';

const steps: StepKey[] = [
  'step1_basic_info',
  'step2_policies',
  'step3_amenities',
  'step4_hotel_images',
  'step5_rooms',
  'step6_rate_and_availability',
  'step7_review',
];

export async function updateHotelProgress(
  hotelId: string,
  stepKey: StepKey,
  isCompleted: boolean
) {
  const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });

  if (!hotel) throw new Error('Hotel not found');

  const completionSteps = hotel.completionSteps as Record<string, boolean>;

  if (stepKey === 'step7_review' && isCompleted) {
    const otherSteps = steps.filter(step => step !== 'step7_review');
    const otherStepsCompleted = otherSteps.every(step => completionSteps[step]);

    if (!otherStepsCompleted) {
      throw new AppError(
        'You must complete all steps before submitting for review',
        400
      );
    }
  }

  completionSteps[stepKey] = isCompleted;

  const completedCount = Object.values(completionSteps).filter(Boolean).length;
  const currentStep = calculateCurrentStep(completionSteps);
  const isFullyCompleted = completedCount === steps.length;

  let status = hotel.status;
  if (isFullyCompleted && status === 'DRAFT') {
    status = 'PENDING_REVIEW';
  } else if (completedCount > 0 && status === 'DRAFT') {
    status = 'IN_PROGRESS';
  }

  const updatedHotel = await prisma.hotel.update({
    where: { id: hotelId },
    data: {
      completionSteps,
      currentStep,
      isFullyCompleted,
      status,
    },
  });

  return {
    isFullyCompleted,
    updatedSteps: updatedHotel.completionSteps as Record<string, boolean>,
    status: updatedHotel.status,
  };
}

function calculateCurrentStep(
  completionSteps: Record<string, boolean>
): number {
  for (let i = 0; i < steps.length; i++) {
    if (!completionSteps[steps[i]]) {
      return i + 1;
    }
  }
  return steps.length;
}
