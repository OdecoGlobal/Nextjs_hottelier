import { prisma } from '@/db/prisma';
import { verifyAndGetUser } from '@/lib/auth/util';
import AppError from '@/lib/errors/app-error';
import { AuthenticatedRequest } from '@/types/custom';
import { Role } from '@prisma/client';
import { NextRequest } from 'next/server';

export const protect = async (req: NextRequest) => {
  const { user } = await verifyAndGetUser(req);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...safeUser } = user;
  req.user = safeUser;
};

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
