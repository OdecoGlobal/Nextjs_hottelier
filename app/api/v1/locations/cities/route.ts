import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { getQueryParams } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { search, sortBy, sortOrder, skip, limitNum } = getQueryParams(req);
    const searchFilter: Prisma.CityWhereInput =
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

    const cities = await prisma.city.findMany({
      where: {
        ...searchFilter,
      },
      orderBy: orderBy,
      skip: skip,
      take: limitNum,
    });

    const totalCount = await prisma.city.count({
      where: { ...searchFilter },
    });
    const totalPages = Math.ceil(totalCount / limitNum);
    return NextResponse.json(
      {
        status: 'success',
        data: { cities, totalPages },
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
