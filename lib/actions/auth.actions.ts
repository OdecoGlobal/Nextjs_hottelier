import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { formatError } from '../utils';
import { axiosInstance } from '../axios';
import { LoginInput, signUpInput } from '@/types';

export async function signUpUser(formData: signUpInput) {
  try {
    const res = await axiosInstance.post('/auth/signup', formData);
    if (!res) throw new Error('An error occured while signing up');

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}

export async function signUpOwner(formData: signUpInput) {
  try {
    const res = await axiosInstance.post('/auth/signup-owner', formData);
    if (!res) throw new Error('An error occured while signing up');

    return { success: true, message: 'User registered successfully' };
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
