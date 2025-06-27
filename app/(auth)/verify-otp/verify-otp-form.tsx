'use client';
import SubmitFormButton from '@/components/submit-form-button';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { resendOTP, verifyOtp } from '@/lib/actions/auth.actions';
import { verifyOtpSchema } from '@/lib/schemas/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const OTPSchema = verifyOtpSchema.omit({
  email: true,
});
type OTPType = z.infer<typeof OTPSchema>;

const VerifyOTPForm = ({ email }: { email: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<OTPType>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { inputOTP: '' },
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const onSubmit = async (data: OTPType) => {
    const { inputOTP } = data;
    const res = await verifyOtp({ inputOTP, email });
    const { success, message } = res;
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        variant: 'default',
      });
      router.replace('/');
    }
    console.log(inputOTP, email);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOTP = async () => {
    startTransition(async () => {
      const res = await resendOTP(email);
      const { success, message } = res;
      if (!success) {
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: message,
          variant: 'default',
        });
        setTimeLeft(60);
        setCanResend(false);
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="inputOTP"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitFormButton
          action="Submit"
          isPending={form.formState.isSubmitting || isPending}
        />

        <div>
          {canResend ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleResendOTP}
              disabled={isPending}
              className="w-full"
            >
              {isPending ? 'Resending...' : 'Resend OTP'}
            </Button>
          ) : (
            <div>Resend OTP available in {formatTime(timeLeft)}</div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default VerifyOTPForm;
