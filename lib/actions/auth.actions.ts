import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { axiosInstance } from '../axios';
import { LoginInput, signUpInput, VeifyOTPType } from '@/types';
import { formatError } from '@/utils/format-error';

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
