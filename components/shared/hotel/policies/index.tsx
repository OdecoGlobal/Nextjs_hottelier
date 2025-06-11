"use client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import HotelCreationSteps from "../creation-steps";
import z from "zod";

import { AdminOwnerRole, HotelPolicyType } from "@/types";
import StepOnePolicy from "./step-one-policy";

import StepTwoPolicy from "./step-two-policies";
import { updateHotelPolicies } from "@/lib/actions/hotel.action";
import { hotelPolicySchema } from "@/lib/schemas/validator";
import {
  hotelPolicyStepOneSchema,
  hotelPolicyStepThreeSchema,
  hotelPolicyStepTwoSchema,
} from "@/lib/schemas/grouped-validators";

const MainPolicyForm = ({
  hotelId,
  role,
}: {
  hotelId: string;
  role: AdminOwnerRole;
}) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [formData, setFormData] = useState<z.infer<typeof hotelPolicySchema>>({
    paymentMethod: [],
    isDepositRequired: false,
    depositAmount: 0,
    isTaxIncludedInRoomRates: false,
    cancellationPolicy: "FREE_CANCELLATION",
    smokingPolicy: "NO_SMOKING",

    isFrontDesk: false,
    isFrontDeskEveryDay: true,
    isFrontDeskOpen24Hours: false,
    frontDeskScheduleStartDay: "MONDAY",
    frontDeskScheduleEndDay: "FRIDAY",
    frontDeskStartTime: "06:00",
    frontDeskEndTime: "06:00",
    isSelfCheckIn: false,
    selfCheckInType: "ACCESS_CODE",

    checkInStartTime: "06:00",
    checkInEndTime: "06:00",
    isOpen24Hours: false,
    isLateCheckIn: false,
    lateCheckInType: "FREE",

    surchargeType: "AMOUNT",
    surchargeAmount: 0,
    lateCheckInStartTime: "06:00",
    lateCheckInEndTime: "06:00",
    isAdvancedNoticeCheckIn: false,
    advanceNoticeCheckInTime: "06:00",

    checkOutTime: "06:00",
    minCheckInAgeAllowed: 18,

    isPetAllowed: false,
    hasAdditionalPolicy: false,
    additionalPolicy: [],
  });

  const handleNext = <T extends z.ZodTypeAny>(
    data: Partial<HotelPolicyType>,
    schema: T,
    nextStep: number
  ) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(result.error.format());
      return;
    }
    setFormData((prev) => ({ ...prev, ...data }));
    console.log(result);
    setStep(nextStep);
    console.log(formData);
  };

  const handlePrevious = () => setStep(step - 1);
  const handleSubmit = async () => {
    const result = hotelPolicyStepThreeSchema.safeParse(formData);
    if (!result.success) return;
    startTransition(async () => {
      const response = await updateHotelPolicies(formData, hotelId);
      if (!response?.success) {
        toast({
          title: "Error",
          variant: "destructive",
          description: response.message,
        });
      } else {
        toast({
          title: "Success",
          description: response.message,
          variant: "default",
        });
      }
      router.replace(`/${role.toLowerCase()}/onboarding/${hotelId}/policies`);
    });

    console.log(formData);
  };
  return (
    <section className=" flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps current={1} />

      <div className=" flex-1 mx-auto py-10 px-5">
        {step === 1 && (
          <StepOnePolicy
            defaultValues={formData}
            onNext={(data) => handleNext(data, hotelPolicyStepOneSchema, 2)}
          />
        )}
        {step === 2 && (
          <StepTwoPolicy
            onNext={(data) => handleNext(data, hotelPolicyStepTwoSchema, 3)}
            onPrevious={handlePrevious}
            defaultValues={formData}
          />
        )}
      </div>
    </section>
  );
};

export default MainPolicyForm;
