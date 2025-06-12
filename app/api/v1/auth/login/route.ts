import AppError from '@/lib/errors/app-error';
import { prisma } from '@/db/prisma';
import { loginSchema } from '@/lib/schemas/validator';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { createSendToken } from '@/lib/auth/util';
import { User } from '@prisma/client';
import { formatApiError } from '@/lib/errors';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = loginSchema.parse(body);
    const { email, password } = validatedData;
    if (!email || !password)
      throw new AppError('Please provide email and password', 400);
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new AppError('Invalid Credentials', 401);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return createSendToken(userWithoutPassword as User, 200);
  } catch (error) {
    return formatApiError(error);
  }
};
