import { steps } from '@/lib/constants';
import { cn, generateSlug } from '@/lib/utils';
import { AdminAgentRole } from '@/types';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const HotelCreationSteps = ({
  current = 0,
  stepName,
  hotelId,
  role,
}: {
  stepName?: string;
  current: number;
  hotelId?: string;
  role: AdminAgentRole;
}) => {
  const currentStepName = stepName || steps[current];
  current = current - 1;
  return (
    <aside className=" md:mb-0">
      <nav className=" md:hidden mb-2 border-b bg-card px-6 py-4 ">
        <h2 className="text-xl font-semibold text-muted-foreground">
          {currentStepName}
        </h2>
      </nav>
      <nav className="hidden md:flex flex-col gap-10 py-6 w-fit px-20 h-full bg-sidebar border-r-2">
        {steps.map((step, i) => {
          const isCompleted = i < current;
          const isCurrent = i === current;
          const isLast = i === steps.length - 1;
          return (
            <div key={step} className="relative">
              <div className="flex gap-2 items-start">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                    isCompleted
                      ? 'bg-blue-700 text-white'
                      : isCurrent
                        ? 'bg-blue-700 text-white'
                        : 'border border-blue-700',
                  )}
                >
                  {i === 0 ? (
                    <>{isCompleted ? <Check /> : i + 1} </>
                  ) : (
                    <Link
                      href={`/${role.toLowerCase()}/onboarding/${hotelId}/${generateSlug(step)}`}
                    >
                      {isCompleted ? <Check /> : i + 1}
                    </Link>
                  )}
                </div>
                <div className="pt-1 text-sm">
                  <div>{step}</div>
                </div>
              </div>
              {!isLast && <div className={cn('w-px h-full ml-4 bg-border')} />}
            </div>
          );
        })}
      </nav>
      {/* MOBILE */}
      <div className="flex  md:hidden justify-around px-3 items-center py-6  w-full  bg-sidebar border-b-2">
        {steps.map((step, i) => {
          const isCompleted = i < current;
          const isCurrent = i === current;
          const isLast = i === steps.length - 1;
          return (
            <React.Fragment key={step}>
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                  isCompleted
                    ? 'bg-blue-700 text-white'
                    : isCurrent
                      ? 'bg-blue-700 text-white'
                      : 'border border-blue-700',
                )}
              >
                {isCompleted ? <Check className="" /> : i + 1}
              </div>
              {!isLast && (
                <hr className="flex-1 border-t border-muted-foreground mx-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </aside>
  );
};

export default HotelCreationSteps;
