import { prisma } from '@/db/prisma';

type StepKey =
  | 'step1_basic_info'
  | 'step2_policies'
  | ' step3_amenities'
  | 'step4_hotel_images'
  | 'step4_rooms'
  | 'step5_review';

export async function updateHotelProgress(
  hotelId: string,
  stepKey: StepKey,
  isCompleted: boolean
) {
  const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });

  if (!hotel) throw new Error('Hotel not found');

  const completionSteps = hotel.completionSteps as Record<string, boolean>;

  completionSteps[stepKey] = isCompleted;

  const completedCount = Object.values(completionSteps).filter(Boolean).length;
  const currentStep = calculateCurrentStep(completionSteps);
  const isFullyCompleted = completedCount === 8;

  let status = hotel.status;
  if (isFullyCompleted && status === 'DRAFT') {
    status = 'PENDING_REVIEW';
  } else if (completedCount > 0 && status === 'DRAFT') {
    status = 'IN_PROGRESS';
  }

  await prisma.hotel.update({
    where: { id: hotelId },
    data: {
      completionSteps,
      currentStep,
      isFullyCompleted,
      status,
    },
  });
}

function calculateCurrentStep(
  completionSteps: Record<string, boolean>
): number {
  const steps = [
    'step1_basic_info',
    'step2_policies',
    'step3_amenities',
    'step4_hotel_images',
    'step5_rooms',
    'step5_review',
    // 'step7_contract',
  ];

  for (let i = 0; i < steps.length; i++) {
    if (!completionSteps[steps[i]]) {
      return i + 1;
    }
  }
  return 6;
}
