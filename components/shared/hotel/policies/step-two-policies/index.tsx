import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { StepTwoPolicyType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm, UseFormWatch } from "react-hook-form";
import FrontDeskPolicy from "./front-desk-policy";
import CheckOutPolicy from "./check-out-policy";
import AgeRestrictionPolicy from "./age-restriction-policy";
import CheckInPolicy from "./check-in-policy";
import { hotelPolicyStepTwoSchema } from "@/lib/schemas/grouped-validators";

export type StepTwoPolicyProps = {
  control: Control<StepTwoPolicyType>;
  watch: UseFormWatch<StepTwoPolicyType>;
};
const StepTwoPolicy = ({
  onNext,
  onPrevious,
  defaultValues,
}: {
  onNext: (FormData: StepTwoPolicyType) => void;
  onPrevious: () => void;
  defaultValues: StepTwoPolicyType;
}) => {
  const form = useForm<StepTwoPolicyType>({
    resolver: zodResolver(hotelPolicyStepTwoSchema),
    defaultValues: defaultValues,
  });
  const { control, watch } = form;

  return (
    <Card>
      <CardHeader>
        <CardDescription className="font-semibold text-xl">
          Step 2 of 3
        </CardDescription>
        <CardTitle className="text-xl md:text-2xl font-bold">
          Check-In / Check-Out Policies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
            <FrontDeskPolicy control={control} watch={watch} />
            <CheckInPolicy control={control} watch={watch} />
            <CheckOutPolicy control={control} />
            <AgeRestrictionPolicy control={control} />
            <div className="flex justify-between">
              <Button type="button" onClick={onPrevious}>
                Previous
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StepTwoPolicy;
