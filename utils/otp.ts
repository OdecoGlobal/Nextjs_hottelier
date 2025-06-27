import { redis } from '@/lib/redis';
import otpGenerator from 'otp-generator';
export const generateOtp = async (email: string) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  await redis.set(`otp:${email}`, otp, { ex: 600 });
  return otp;
};
