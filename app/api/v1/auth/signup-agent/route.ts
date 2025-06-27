import { prisma } from '@/db/prisma';
import { signUpFormSchema } from '@/lib/schemas/validator';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { formatApiError } from '@/lib/errors';
import ConfirmEmail from '@/emails/otp';
import { sendEmail } from '@/utils/email';
import { encryptEmail } from '@/utils/encrpyt';
import { generateOtp } from '@/utils/otp';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = signUpFormSchema.parse(body);
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    await prisma.user.create({
      data: {
        userName: validatedData.userName,
        email: validatedData.email,
        password: hashedPassword,
        role: 'AGENT',
      },
    });
    const otp = await generateOtp(validatedData.email);
    const encryptedEmail = encryptEmail(validatedData.email);
    await sendEmail({
      subject: 'Verify Your RoaméLux Account',
      component: ConfirmEmail({ validationCode: otp }),
    });

    return NextResponse.json(
      {
        status: 'success',
        message: 'Signup successful, check your email for verification code',
        token: encryptedEmail,
      },
      { status: 201 },
    );
  } catch (error) {
    return formatApiError(error);
  }
};
