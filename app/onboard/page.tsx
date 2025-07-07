export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import IncompleteHotelComponent from '@/components/shared/hotel/onboard/incomplete';
import StartNewHotel from '@/components/shared/hotel/onboard/start-new-hotel';
import { getPreOnboardHotels } from '@/lib/actions/hotel.action';
import { steps } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Onboard',
};

const HotelOnboardingPage = async () => {
  await requireAdminOrAgent();
  const res = await getPreOnboardHotels();
  const incompleteHotels = res.data;

  const getStepName = (stepNumber: number) =>
    steps[stepNumber] || 'Unknown step';

  return (
    <section className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Hotellier</h1>
          <p>
            {incompleteHotels.length > 0
              ? 'Continue setting up yout hotels or start a new one'
              : `Let's get your hotel listed and ready for guest`}
          </p>
        </header>
        <main className="space-y-6">
          <IncompleteHotelComponent
            incompleteHotels={incompleteHotels}
            getStepName={getStepName}
          />
          <StartNewHotel />

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Need help? Check out our{' '}
              <Link
                href="/#help"
                className="text-brand-secondary hover:underline"
              >
                setup guide
              </Link>{' '}
              or{' '}
              <Link
                href="/#contact"
                className="text-brand-secondary hover:underline"
              >
                contact support
              </Link>
            </p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default HotelOnboardingPage;
