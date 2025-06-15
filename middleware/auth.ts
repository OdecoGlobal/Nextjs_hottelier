import { prisma } from '@/db/prisma';
import { verifyAndGetUser } from '@/lib/auth/util';
import AppError from '@/lib/errors/app-error';
import { AuthenticatedRequest } from '@/types/custom';
import { Role } from '@prisma/client';
import { NextRequest } from 'next/server';

export const protect = async (req: NextRequest) => {
  //   try {
  const { user } = await verifyAndGetUser(req);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...safeUser } = user;
  req.user = safeUser;
};

// return NextResponse.next();
//   } catch (error) {
//     const errorMessage = formatError(error);
//     console.log(errorMessage);
//     return NextResponse.json(
//       {
//         status: "error",
//         message: errorMessage,
//       },
//       { status: 401 }
//     );
//   }

//   const headers = new Headers(req.headers);
//   headers.set("x-user-id", user.id);
//   return NextResponse.next({ request: { headers } });
// };

export const restrictTo = (...roles: Role[]) => {
  return (req: NextRequest) => {
    const authreq = req as AuthenticatedRequest;
    if (!req.user || !roles.includes(authreq.user.role)) {
      throw new AppError('Forbidden', 403);
    }
  };
};

interface ValidateHotelOptions {
  allowAdmin?: boolean;
}

export const validateHotelAcces =
  (options: ValidateHotelOptions = { allowAdmin: true }) =>
  async (req: NextRequest, params?: Record<string, string>) => {
    const authReq = req as AuthenticatedRequest;
    const hotelId = params?.hotelId;
    if (!hotelId) {
      throw new AppError('Hotel ID is required', 400);
    }
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });
    if (!hotel) {
      throw new AppError('Hotel not found', 404);
    }

    const { user } = authReq;
    const isAllowed = options.allowAdmin
      ? hotel.ownerId === user.id || user.role === 'ADMIN'
      : hotel.ownerId === user.id;

    if (!isAllowed) {
      throw new AppError('Access denied', 403);
    }
    req.hotel = hotel;
  };

/*
  import { jwtVerify, JWTPayload, SignJWT } from 'jose';
  import { NextResponse } from 'next/server';
  import { User } from '@/types';
  import { cookies } from 'next/headers';
  
  export interface DecodedToken extends JWTPayload {
    id: string;
    role?: string;
  }
  
  export function changedPasswordAfter(
    user: User,
    JWTTimestamp: number
  ): boolean {
    if (user.passwordChangedAt) {
      const changedTimestamp = Math.floor(
        user.passwordChangedAt.getTime() / 1000
      );
      return JWTTimestamp < changedTimestamp;
    }
  
    return false;
  }
  
  export async function signToken(
    payload: { id: string; role?: string },
    // secret: string,
    expiresIn: string = '24h'
  ) {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
  
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(secretKey);
  }
  
  export const verifyToken = async (
    token: string,
    secret: string
  ): Promise<DecodedToken> => {
    try {
      const secretKey = new TextEncoder().encode(secret);
      const { payload } = await jwtVerify(token, secretKey);
      if (typeof payload === 'object' && payload !== null && 'id' in payload) {
        return payload as DecodedToken;
      } else {
        throw new Error('Invalid token structure');
      }
    } catch (error) {
      throw error;
    }
  };
  
  export const createSendToken = async (user: User, statusCode: number) => {
    const token = await signToken({
      id: user.id,
      role: user.role,
    });
    console.log('Token:', token);
  
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
    response.cookies.set({
      name: 'jwt',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  
    return response;
  };
  
  */
