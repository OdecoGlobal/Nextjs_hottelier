import AppError from '@/lib/errors/app-error';
import { NextRequest } from 'next/server';
import { prisma } from '@/db/prisma';
import { User } from '@prisma/client';
import { verifyTokenForEdge } from './verify';

export function changedPasswordAfter(
  user: User,
  JWTTimestamp: number,
): boolean {
  if (user.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      user.passwordChangedAt.getTime() / 1000,
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
}

export const verifyAndGetUser = async (req: NextRequest) => {
  let token: string | undefined;

  const authHeader = req.headers.get('authorization');

  if (authHeader?.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  } else {
    token = req.cookies.get('jwt')?.value;
  }

  if (!token) throw new AppError('Not authenticated', 401);

  const decoded = await verifyTokenForEdge(token);
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    cacheStrategy: {
      ttl: 5 * 60,
    },
  });

  if (!user) throw new AppError('User no longer exists', 401);
  if (!decoded.iat) throw new Error(' Invalid Token');
  if (changedPasswordAfter(user, decoded.iat))
    throw new AppError('User recently changed password!!, Login again', 401);

  return { token, user };
};

/*
interface DecodedToken extends JwtPayload {
  id: string;
}
export const verifyToken = (
  token: string,
  secret: string
): Promise<DecodedToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
        resolve(decoded as DecodedToken);
      } else {
        reject(new Error('Invalid token structure'));
      }
    });
  });
};

const signToken = (id: string, role?: string) => {
  if (!JWT_SECRET || !JWT_EXPIRES_IN) {
    throw new Error(
      'JWT_SECRET or JWT_EXPIRES_IN is not defined in environment variables'
    );
  }

  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  } as SignOptions);
};

const cookieOptions = {
  expires: new Date(
    Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
  ),
};
export const createSendToken = (user: User, statusCode: number) => {
  const token = signToken(user.id, user.role);
  console.log('API', token);

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
*/
