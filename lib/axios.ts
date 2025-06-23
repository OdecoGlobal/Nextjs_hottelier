import axios, { AxiosInstance } from 'axios';
import { API_URL } from './constants';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,

  withCredentials: true,
});
axiosInstance.interceptors.request.use(async config => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get('jwt')?.value;
    if (jwtToken) {
      config.headers.set('Cookie', `jwt=${jwtToken}`);
    }
  }
  return config;
});
