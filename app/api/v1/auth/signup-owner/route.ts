import { prisma } from '@/db/prisma';
import { signUpFormSchema } from '@/lib/schemas/validator';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { User } from '@prisma/client';
import { formatApiError } from '@/lib/errors';
import { createSendToken } from '@/lib/auth/verify';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = signUpFormSchema.parse(body);
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    const newUser = await prisma.user.create({
      data: {
        userName: validatedData.userName,
        email: validatedData.email,
        password: hashedPassword,
        role: 'OWNER',
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;

    return createSendToken(userWithoutPassword as User, 201);
  } catch (error) {
    return formatApiError(error);
  }
};
