import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { getQueryParams } from '@/lib/utils';
import { protect, restrictTo } from '@/middleware/auth';
import { HotelStatus, HotelStatusType } from '@/types';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { search, skip, limitNum } = getQueryParams(req);
    const user = await protect(req);
    restrictTo('AGENT', 'ADMIN')(user);
    const { searchParams } = req.nextUrl;

    const rawStatus = searchParams.get('status');
    const status = rawStatus?.toUpperCase();
    const agentId = user.id;
    const whereClause: Prisma.HotelWhereInput = {
      agentId: agentId,
    };

    if (
      status &&
      typeof status === 'string' &&
      HotelStatus.includes(status as HotelStatusType)
    ) {
      whereClause.status = status as HotelStatusType;
    }

    if (search && search !== 'all') {
      whereClause.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const hotel = await prisma.hotel.findMany({
      where: whereClause,
      include: {
        basicInfo: true,
        images: {
          select: {
            imageType: true,
            imageUrl: true,
            public_id: true,
          },
        },
      },
      take: limitNum,
      orderBy: {
        updatedAt: 'desc',
      },
      skip,
    });

    const totalCount = await prisma.hotel.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(totalCount / limitNum);

    return NextResponse.json({
      status: 'success',
      data: hotel,
      totalPages,
      totalCount,
    });
  } catch (error) {
    return formatApiError(error);
  }
};
