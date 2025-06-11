import { requireOwner } from "@/auth-guard";
import IncompleteHotelComponent from "@/components/shared/hotel/onboard/incomplete";
import StartNewHotel from "@/components/shared/hotel/onboard/start-new-hotel";
import { getIncompleteHotels } from "@/lib/actions/hotel.action";

import { steps } from "@/lib/constants";
import Link from "next/link";

const OnboardingPage = async () => {
  const owner = await requireOwner();

  const res = await getIncompleteHotels();
  const incompleteHotels = res.data;
  console.log(incompleteHotels);
  console.log(res);

  const getStepName = (stepNumber: number) =>
    steps[stepNumber - 1] || "Unknown step";

  return (
    <section className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Hotellier</h1>
          <p>
            {incompleteHotels.length > 0
              ? "Continue setting up yout hotels or start a new one"
              : `Let's get your hotel listed and ready for guest`}
          </p>
        </header>
        <main className="space-y-6">
          <IncompleteHotelComponent
            incompleteHotels={incompleteHotels}
            getStepName={getStepName}
            role={owner.user.role as "OWNER"}
          />
          <StartNewHotel />

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Need help? Check out our{" "}
              <Link href="/help#" className="text-blue-600 hover:underline">
                setup guide
              </Link>{" "}
              or{" "}
              <Link href="/contact#" className="text-blue-600 hover:underline">
                contact support
              </Link>
            </p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default OnboardingPage;
