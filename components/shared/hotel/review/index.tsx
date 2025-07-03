'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { submitHotel } from '@/lib/actions/hotel.action';
import { AlertCircle, CheckCircle2, Loader } from 'lucide-react';
import HotelCreationSteps from '../creation-steps';
import OnboardReviewCard from './onboard-review-card';
import { AdminAgentRole, HotelType } from '@/types';
import { generateSlug } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const OnboardingReviewComponent = ({
  hotel,
  role,
}: {
  hotel: HotelType;
  role: AdminAgentRole;
}) => {
  const { completionSteps, basicInfo, isFullyCompleted, currentStep, id } =
    hotel;
  const { toast } = useToast();
  const router = useRouter();

  const { step7_review, ...steps } = completionSteps;
  void step7_review;
  const completedSteps = Object.values(steps).filter(step => step).length;
  const totalSteps = Object.keys(steps).length;
  const progress = Math.round((completedSteps / totalSteps) * 100);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await submitHotel(hotel.id);
      if (!res.success) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: res.message,
        });
      } else {
        toast({
          title: 'Success',
          description: res.message,
          variant: 'default',
        });
        router.replace(`/onboard/${role.toLowerCase()}`);
      }
    });
  };

  const onboardingSteps = [
    {
      title: 'Basic Info',
      key: 'step1_basic_info',
      description: 'Hotel name, location, category, and contact details...',
    },
    {
      title: 'Policies',
      key: 'step2_policies',
      description:
        'Payment policy,check-in/out times, cancellation policy, house rules...',
    },
    {
      title: 'Amenities',
      key: 'step3_amenities',
      description: 'Facilities and services offered by the hotel',
    },
    {
      title: 'Photos',
      key: 'step4_hotel_images',
      description: 'Property photos and visual content',
    },
    {
      title: 'Rooms',
      key: 'step5_rooms',
      description: 'Room types, descriptions, and amenities',
    },
    {
      title: 'Rates and Availability',
      key: 'step6_rate_and_availability',
      description: 'Pricing structure and availability calendar',
    },
  ] as const;

  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps current={currentStep} role={role} hotelId={id} />
      <main className=" flex-1 py-10 px-5 space-y-4 max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex md:flex-row md:items-center justify-between gap-2 ">
            <div className="space-y-2">
              <CardTitle>Review and Submit - {basicInfo.name}</CardTitle>
              <CardDescription>
                Review all sections before submiting to admin
              </CardDescription>
            </div>

            <div>
              <h1 className="text-sm text-muted-foreground">Progress</h1>
              <p className="text-2xl font-bold text-blue-600">
                {completedSteps} / {totalSteps}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex justify-between text-muted-foreground mb-2">
                <span>Completion Status</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="[&>div]:bg-blue-600" />
            </div>
          </CardContent>
        </Card>

        {isFullyCompleted && (
          <Card className="bg-green-50 border border-green-200">
            <CardContent className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <h3 className="font-medium text-green-800">
                  Hotel Submitted for Review
                </h3>
                <p className="text-green-700 text-sm">
                  Your hotel has been submitted to admin for approval.
                  You&apos;ll be notified once reviewed.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {!isFullyCompleted && (
          <Card className="bg-yellow-50 border border-yellow-200">
            <CardContent className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <h3 className="font-medium text-yellow-800">
                  Complete All Steps Required
                </h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Please complete all required sections before submitting for
                  review.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        {onboardingSteps.map(step => {
          const { title, key, description } = step;
          return (
            <OnboardReviewCard
              key={key}
              title={title}
              description={description}
              isCompleted={completionSteps[key]}
              isFullyCompleted={isFullyCompleted}
              url={`/${role.toLowerCase()}/onboarding/${id}/${generateSlug(title)}`}
            />
          );
        })}
        <Card>
          <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between flex-wrap space-y-3 ">
            <div>
              <h3 className="font-semibold">Ready to submit</h3>
              <p className="text-sm tracking-tight text-muted-foreground text-wrap">
                Once submitted, admin will review your hotel and notify you of
                the status
              </p>
            </div>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending || isFullyCompleted}
              className={` font-medium transition-all self-end ${
                !isFullyCompleted
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isPending ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" /> Submiting
                </>
              ) : isFullyCompleted ? (
                'Already Submitted'
              ) : (
                'Submit'
              )}
            </Button>
          </CardContent>
        </Card>
      </main>
    </section>
  );
};

export default OnboardingReviewComponent;
