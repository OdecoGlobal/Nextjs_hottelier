import DeleteDialog from '@/components/delete.dialog';
import StatusBadge from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { deletHotel } from '@/lib/actions/hotel.action';
import {
  formatDateTime,
  generateSlug,
  getHotelCompletionProgress,
} from '@/lib/utils';
import { HotelType } from '@/types';
import {
  ArrowRight,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

const IncompleteHotelComponent = ({
  incompleteHotels,
  getStepName,
}: {
  incompleteHotels: HotelType[];
  getStepName: (stepNumber: number) => string;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {incompleteHotels.map(hotel => {
          const {
            name,
            location,
            isFullyCompleted,
            id,
            completionSteps,
            currentStep,
            status,
            updatedAt,
          } = hotel;
          const progress = getHotelCompletionProgress(completionSteps);
          const nextStep = getStepName(currentStep - 1);

          const deleteAction = async () => {
            'use server';
            return await deletHotel(id);
          };

          return (
            <Card
              key={id}
              className="hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle>{name || 'Unnamed Hotel'}</CardTitle>

                    {location && (
                      <CardDescription className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span className="capitalize">
                          {location.length > 20
                            ? `${location.substring(0, 20)}...`
                            : location}
                        </span>
                      </CardDescription>
                    )}
                  </div>
                  <StatusBadge status={status} />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="[&>div]:bg-glow" />
                </div>
                <div className="flex items-center text-sm">
                  <Clock size={14} className="mr-2" />
                  <span>Next: {nextStep}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar size={12} className="mr-1" />
                  <span>Updated {formatDateTime(updatedAt).dateTime}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={isFullyCompleted}>
                  {isFullyCompleted ? (
                    'Pending Review'
                  ) : (
                    <>
                      <Link
                        href={`/onboard/hotel/${
                          hotel.id
                        }/${generateSlug(nextStep)}`}
                      >
                        Continue
                      </Link>
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </Button>
                <DeleteDialog action={deleteAction} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {incompleteHotels.length === 0 && (
        <div className="text-center mt-12">
          <div className="w-24 h-24 bg-foreground/75 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 size={48} className="text-muted/70" />
          </div>
          <h3 className="text-2xl font-semibold mb-3">Ready to get started?</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Create your first hotel listing and start welcoming guests to your
            property.
          </p>
          <Button
            asChild
            className="bg-brand-primary-100 hover:bg-brand-primary-200 text-slate-50 font-medium py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto group text-lg"
          >
            <Link href="/onboard/hotel/">
              <Plus size={20} className="mr-2" />
              Create Your First Hotel
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default IncompleteHotelComponent;
