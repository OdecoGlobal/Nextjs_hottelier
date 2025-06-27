import { prisma } from '@/db/prisma';
import { createSendToken } from '@/lib/auth/verify';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { redis } from '@/lib/redis';
import { verifyOtpSchema } from '@/lib/schemas/validator';
import { User } from '@/types';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = verifyOtpSchema.parse(body);
    const { inputOTP, email } = validatedData;

    const storedOtp = await redis.get(`otp:${email}`);

    console.log(inputOTP, storedOtp);
    if (storedOtp !== inputOTP)
      throw new AppError('Invalid or expired OTP', 400);

    const user = await prisma.user.update({
      where: { email: email },
      data: { isEmailVerified: true, emailVerified: new Date() },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return createSendToken(userWithoutPassword as User, 201);
  } catch (error) {
    return formatApiError(error);
  }
};
