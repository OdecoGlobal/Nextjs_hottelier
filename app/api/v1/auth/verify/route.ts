import { verifyAndGetUser } from '@/lib/auth/util';
import { formatApiError } from '@/lib/errors';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { token, user } = await verifyAndGetUser(req);
    return NextResponse.json(
      {
        status: 'success',
        data: { token, user },
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
