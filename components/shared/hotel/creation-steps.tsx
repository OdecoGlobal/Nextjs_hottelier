import { steps } from '@/lib/constants';
import { cn, generateSlug } from '@/lib/utils';
import { CompletionSteps, HotelStatusType, StepKey } from '@/types';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import slugify from 'slugify';

const HotelCreationSteps = ({
  current = 0,
  hotelId,
  status,
  completedSteps,
}: {
  current: number;
  hotelId: string;
  status: HotelStatusType;
  completedSteps: CompletionSteps;
}) => {
  const currentStepName = steps[current];
  const allStepsDisabled = status !== 'IN_PROGRESS' && status !== 'DRAFT';
  return (
    <aside className=" md:mb-0">
      <nav className=" md:hidden mb-2 border-b bg-card px-6 py-4 ">
        <h2 className="text-xl font-semibold text-muted-foreground">
          {currentStepName}
        </h2>
      </nav>
      <nav className="hidden md:flex flex-col gap-10 py-6 w-fit px-20 h-full bg-sidebar border-r-2">
        {steps.map((step, i) => {
          const isInit = i === 0;
          const isCurrent = i === current;
          const isLast = i === steps.length - 1;
          const shouldLink = !isInit && !allStepsDisabled;
          const stepSlug =
            `step${i}_${slugify(step, { lower: true, strict: true, replacement: '_' })}` as StepKey;

          const isCompleted = completedSteps?.[stepSlug] ?? false;
          return (
            <div key={step} className="relative">
              <div className="flex gap-2 items-start">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                    isCompleted
                      ? 'bg-glow text-white'
                      : isCurrent
                        ? 'bg-glow text-white'
                        : 'border border-glow',
                    allStepsDisabled && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  {isCompleted ? (
                    <Check />
                  ) : shouldLink ? (
                    <Link
                      href={`/onboard/hotel/${hotelId}/${generateSlug(step)}`}
                    >
                      {i + 1}
                    </Link>
                  ) : (
                    i + 1
                  )}
                </div>
                <div
                  className={cn(
                    'pt-1 text-sm',
                    allStepsDisabled && 'text-muted-foreground',
                  )}
                >
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
          const isInit = i === 0;
          const isCurrent = i === current;
          const isLast = i === steps.length - 1;
          const shouldLink = !isInit && !allStepsDisabled;
          const stepSlug =
            `step${i}_${slugify(step, { lower: true, strict: true, replacement: '_' })}` as StepKey;

          const isCompleted = completedSteps?.[stepSlug] ?? false;
          return (
            <React.Fragment key={step}>
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                  isCompleted
                    ? 'bg-glow text-white'
                    : isCurrent
                      ? 'bg-glow text-white'
                      : 'border border-glow',
                  allStepsDisabled && 'opacity-50 cursor-not-allowed',
                )}
              >
                {isCompleted ? (
                  <Check />
                ) : shouldLink ? (
                  <Link
                    href={`/onboard/hotel/${hotelId}/${generateSlug(step)}`}
                  >
                    {i + 1}
                  </Link>
                ) : (
                  i + 1
                )}
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
