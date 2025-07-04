import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { axiosInstance } from '../axios';
import { LoginInput, signUpInput, User, VeifyOTPType } from '@/types';
import { formatError } from '@/utils/format-error';
import { fetchInstance } from '../fetch';
import { API_CACHE_TIMEOUT } from '../constants';

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
    const res = await axiosInstance.post<{ data: { user: User } }>(
      '/auth/login',
      formData,
    );
    if (!res) throw new Error('An error occured while logging in');
    const { user } = res.data.data;
    console.log(user);
    return { success: true, message: 'User logged in successfully', user };
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

export async function verifyUser(): Promise<User | null> {
  try {
    const res = await fetchInstance.get('auth/verify', {
      cache: 'force-cache',
      next: { revalidate: API_CACHE_TIMEOUT, tags: ['verify-user'] },
    });
    const { user } = res.data;
    return user;
  } catch {
    return null;
  }
}
