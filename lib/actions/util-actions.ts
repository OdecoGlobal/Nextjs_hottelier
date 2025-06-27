'use server';

import ConfirmEmail from '@/emails/otp';
import { sendEmail } from '@/utils/email';
import { generateOtp } from '@/utils/otp';
import { rateLimit } from '../rate-limit';

const OTP_RESEND_LIMIT = 3;
const OTP_RESEND_WINDOW = 60 * 60 * 1000;
function simpleFormatError(error: unknown): string {
  if (!error) return 'Unknown error occurred';
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return 'An unknown error occurred';
  }
}

export async function resendOTP(email: string) {
  try {
    await rateLimit(`resend-otp:${email}`, OTP_RESEND_LIMIT, OTP_RESEND_WINDOW);

    const otp = await generateOtp(email);
    await sendEmail({
      subject: 'OTP Resent',
      component: ConfirmEmail({ validationCode: otp }),
    });
    return {
      success: true,
      message: 'One Time password has been resent successfully',
    };
  } catch (error) {
    return { success: true, message: simpleFormatError(error) };
  }
}
