import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { protect, restrictTo } from '@/middleware/auth';
import { AuthenticatedRequest } from '@/types/custom';
import { NextRequest, NextResponse } from 'next/server';
const validStatuses = [
  'DRAFT',
  'IN_PROGRESS',
  'PENDING_REVIEW',
  'APPROVED',
  'REJECTED',
  'ACTIVE',
  'INACTIVE',
] as const;
type HotelStatus = (typeof validStatuses)[number];

export const GET = async (req: NextRequest) => {
  try {
    await protect(req);
    restrictTo('AGENT', 'ADMIN')(req);
    const authReq = req as AuthenticatedRequest;
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const agentId = authReq.user.id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      agentId: agentId,
    };

    if (
      status &&
      typeof status === 'string' &&
      validStatuses.includes(status as HotelStatus)
    ) {
      whereClause.status = status as HotelStatus;
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
