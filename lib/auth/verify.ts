import { jwtVerify, JWTPayload, SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { User } from '@/types';
import { cookies } from 'next/headers';
import { Role } from '@prisma/client';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../constants';

export interface DecodedToken extends JWTPayload {
  id: string;
  role?: Role;
}

const cookieOptions = {
  expires: new Date(
    Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function signToken(payload: DecodedToken) {
  const secretKey = new TextEncoder().encode(JWT_SECRET);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secretKey);
}

export const verifyTokenForEdge = async (
  token: string
): Promise<DecodedToken> => {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(token, secretKey);
  return payload as DecodedToken;
};

export const createSendToken = async (user: User, statusCode: number) => {
  const token = await signToken({
    id: user.id,
    role: user.role,
  });
  console.log('Token:', token);
  const cookiesStore = await cookies();
  cookiesStore.set('jwt', token, cookieOptions);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;

  const response = NextResponse.json(
    {
      status: 'success',
      token,
      data: {
        user: userWithoutPassword,
      },
    },
    { status: statusCode }
  );

  response.cookies.set('jwt', token, cookieOptions);
  return response;
};
