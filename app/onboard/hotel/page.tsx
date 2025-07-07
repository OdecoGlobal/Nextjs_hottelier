export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import CreateNewHotel from '@/components/shared/hotel/onboard/create-new-hotel';
import { Card, CardContent } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboard',
};

const OnboardingPage = async () => {
  await requireAdminOrAgent();
  return (
    <section className="space-y-6">
      <Card>
        <CardContent className="text-center space-y-4 pb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Your Success Journey!
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to showcase your amazing property to the world? Let&apos;s
              get started by creating your hotel profile. This is where your
              hospitality dreams become reality!
            </p>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Quick Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Global Reach</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Maximum Bookings</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <CreateNewHotel />
    </section>
  );
};

export default OnboardingPage;
