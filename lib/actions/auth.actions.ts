'use server';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { formatError } from '../utils';
import { axiosInstance } from '../axios';
import { LoginInput, signUpInput, VeifyOTPType } from '@/types';
import { generateOtp } from '@/utils/otp';
import { sendEmail } from '@/utils/email';
import ConfirmEmail from '@/emails/otp';
import { rateLimit } from '../rate-limit';

export async function signUpUser(formData: signUpInput) {
  try {
    const res = await axiosInstance.post('/auth/sign-up', formData);
    if (!res) throw new Error('An error occured while signing up');
    const data = res.data;
    const { message, token } = data;

    return { success: true, message, token };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}

export async function signupAgent(formData: signUpInput) {
  try {
    const res = await axiosInstance.post('/auth/signup-agent', formData);
    if (!res) throw new Error('An error occured while signing up');

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}

export async function verifyOtp(formData: VeifyOTPType) {
  try {
    const res = await axiosInstance.post('/auth/verify-otp', formData);
    if (!res) throw new Error('An error occured while verifying OTP');

    return { success: true, message: 'User verified successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}
const OTP_RESEND_LIMIT = 3;
const OTP_RESEND_WINDOW = 60 * 60 * 1000;

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
    return { success: true, message: formatError(error) };
  }
}

export async function loginUser(formData: LoginInput) {
  try {
    const res = await axiosInstance.post('/auth/login', formData);
    if (!res) throw new Error('An error occured while logging in');

    return { success: true, message: 'User logged in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}

export async function logOut() {
  try {
    const res = await axiosInstance.post('/auth/logout');
    if (!res) throw new Error('An error occured while logging out');

    return { success: true, message: 'User logged out successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}
