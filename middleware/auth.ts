import { prisma } from '@/db/prisma';
import { verifyAndGetUser } from '@/lib/auth/util';
import AppError from '@/lib/errors/app-error';
import { User } from '@/types';
import { Role } from '@prisma/client';
import { NextRequest } from 'next/server';

export const protect = async (req: NextRequest) => {
  const { user } = await verifyAndGetUser(req);
  const { password, ...safeUser } = user;
  void password;
  return safeUser;
};

export const restrictTo = (...roles: Role[]) => {
  return (user: { role: Role }) => {
    if (!user || !roles.includes(user.role)) {
      throw new AppError('Forbidden', 403);
    }
  };
};

export const validateHotelAcces = async (
  hotelId: string,
  user: User,
  allowAdmin: boolean = true,
) => {
  if (!hotelId) {
    throw new AppError('Hotel ID is required', 400);
  }
  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
  });
  if (!hotel) {
    throw new AppError('Hotel not found', 404);
  }
  const isAllowed = allowAdmin
    ? hotel.agentId === user.id || user.role === 'ADMIN'
    : hotel.agentId === user.id;

  if (!isAllowed) {
    throw new AppError('Access denied', 403);
  }
  return hotel;
};
