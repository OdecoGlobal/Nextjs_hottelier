import { catchAsync } from "@/lib/auth/catch-async";
import { prisma } from "@/db/prisma";
import { signUpFormSchema } from "@/lib/schemas/validator";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { createSendToken } from "@/lib/auth/util";

export const POST = catchAsync(async (req: NextRequest) => {
  const body = await req.json();
  const validatedData = signUpFormSchema.parse(body);
  const hashedPassword = await bcrypt.hash(validatedData.password, 12);

  const newUser = await prisma.user.create({
    data: {
      userName: validatedData.userName,
      email: validatedData.email,
      password: hashedPassword,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = newUser;

  return createSendToken(userWithoutPassword, 201);
});
