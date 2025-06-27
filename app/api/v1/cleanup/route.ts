import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('upstash-signature');
    if (!signature) throw new AppError('unauthorized', 401);
    const res = await prisma.user.deleteMany({
      where: {
        isEmailVerified: false,
        createdAt: {
          lt: new Date(Date.now() - 24 * 60 * 60 * 60),
        },
      },
    });
    return NextResponse.json({
      status: 'success',
      deletedCount: res.count,
      message: `Deleted ${res.count} unverified users`,
    });
  } catch (error) {
    return formatApiError(error);
  }
}
