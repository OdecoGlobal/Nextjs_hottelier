'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Clock, Edit3 } from 'lucide-react';

const OnboardReviewCard = ({
  isCompleted,
  title,
  description,
  isFullyCompleted,
  url,
  hideEdit,
}: {
  isCompleted: boolean;
  title: string;
  description: string;
  isFullyCompleted: boolean;
  url: string;
  hideEdit: boolean;
}) => {
  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
              isCompleted
                ? 'bg-green-100 text-green-600'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {isCompleted ? (
              <Check className="w-5 h-5" />
            ) : (
              <Clock className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            {isCompleted && (
              <Badge className="bg-green-100 text-green-800 ">Completed</Badge>
            )}
          </div>
        </div>
        {!hideEdit && (
          <Button
            className="bg-transparent text-brand-primary-100 hover:text-brand-primary-200 rounded-lg transition-colors ml-auto"
            disabled={isFullyCompleted}
            onClick={() => (window.location.href = url)}
            variant="ghost"
            type="button"
          >
            <Edit3 className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isCompleted ? 'Edit' : 'Complete'}
            </span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default OnboardReviewCard;
