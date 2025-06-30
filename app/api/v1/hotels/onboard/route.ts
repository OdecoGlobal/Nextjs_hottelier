import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { protect, restrictTo } from '@/middleware/auth';
import { HotelStatus, HotelStatusType } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const user = await protect(req);
    restrictTo('AGENT', 'ADMIN')(user);
    const { searchParams } = req.nextUrl;

    const rawStatus = searchParams.get('status');
    const status = rawStatus?.toUpperCase;
    const agentId = user.id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      agentId: agentId,
    };

    if (
      status &&
      typeof status === 'string' &&
      HotelStatus.includes(status as HotelStatusType)
    ) {
      whereClause.status = status as HotelStatusType;
    }

    const hotel = await prisma.hotel.findMany({
      where: whereClause,
      include: {
        basicInfo: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return NextResponse.json({
      status: 'success',
      data: hotel,
    });
  } catch (error) {
    return formatApiError(error);
  }
};
