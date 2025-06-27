import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { NextResponse } from 'next/server';
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';

export const POST = verifySignatureAppRouter(async () => {
  try {
    const res = await prisma.user.deleteMany({
      where: {
        isEmailVerified: false,
        createdAt: {
          lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
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
});
