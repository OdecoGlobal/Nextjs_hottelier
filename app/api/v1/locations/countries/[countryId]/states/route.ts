import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { getQueryParams } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ countryId: string }> }
) => {
  try {
    const { countryId } = await params;
    const { search, sortBy, sortOrder, skip, limitNum } = getQueryParams(req);

    const searchFilter: Prisma.StateWhereInput =
      search && search !== 'all'
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            } as Prisma.StringFilter,
          }
        : {};

    const orderBy: Prisma.CityOrderByWithRelationInput = {
      [sortBy as string]: sortOrder as 'asc' | 'desc',
    };

    const states = await prisma.state.findMany({
      where: { countryId, ...searchFilter },
      orderBy,
      take: limitNum,
      skip,
    });

    const totalCount = await prisma.state.count({
      where: {
        countryId,
        ...searchFilter,
      },
    });
    const totalPages = Math.ceil(totalCount / limitNum);

    return NextResponse.json(
      {
        status: 'success',
        data: {
          states,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
