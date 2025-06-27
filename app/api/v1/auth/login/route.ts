import AppError from '@/lib/errors/app-error';
import { prisma } from '@/db/prisma';
import { loginSchema } from '@/lib/schemas/validator';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@prisma/client';
import { formatApiError } from '@/lib/errors';
import { createSendToken } from '@/lib/auth/verify';
import { getClientIp } from '@/utils/get-client-ip';
import { rateLimit } from '@/lib/rate-limit';
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 3 * 60 * 60 * 1000;

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = loginSchema.parse(body);

    const { email, password } = validatedData;
    if (!email || !password)
      throw new AppError('Please provide email and password', 400);

    const ip = getClientIp(req);

    try {
      await rateLimit(`login-ip:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
    } catch {
      return NextResponse.json(
        { message: 'Too many login attempts, Try again later' },
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': `${Math.floor(LOGIN_WINDOW_MS / 1000)}`,
          },
        },
      );
    }

    if (email) {
      try {
        await rateLimit(`login-email:${email}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
      } catch {
        return NextResponse.json(
          { message: 'Too many login attempts, Try again later' },
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': `${Math.floor(LOGIN_WINDOW_MS / 1000)}`,
            },
          },
        );
      }
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new AppError('Invalid Credentials', 401);
    }
    if (!user.isEmailVerified || !user.isActive || user.isSuspended)
      throw new AppError('Account access denied! Contact support', 401);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return createSendToken(userWithoutPassword as User, 200);
  } catch (error) {
    return formatApiError(error);
  }
};
