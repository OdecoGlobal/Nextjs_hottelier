import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import slugify from 'slugify';
import z, { ZodError } from 'zod';
import { CompletionSteps } from '@/types';
import { AxiosError } from 'axios';
import { NextRequest } from 'next/server';

export const pickKeys = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  Object.keys(schema.shape) as (keyof T)[];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function generateSlug(text: string) {
  return slugify(text, { lower: true, strict: true });
}

const padTime = (num: number) => num.toString().padStart(2, '0');
const generateTimeSlots = (includeNextDay = false) => {
  return Array.from({ length: 48 }, (_, i) => {
    const totalMinutes = (6 * 60 + i * 30) % (24 * 60);
    const hour24 = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const period = hour24 < 12 ? 'AM' : 'PM';
    const hour12 = hour24 % 12 || 12;
    const minuteStr = minute === 0 ? '00' : '30';

    let timeLabel = `${hour12}:${minuteStr} ${period}`;

    // Handle special cases
    if (hour24 === 12 && minute === 0) timeLabel = 'Noon';
    if (hour24 === 0 && minute === 0) timeLabel = 'Midnight';

    // Handle "next day" notation if enabled
    if (
      includeNextDay &&
      hour24 >= 0 &&
      hour24 < 6 &&
      !(hour24 === 0 && minute === 0)
    ) {
      timeLabel += ' the next day';
    }

    return {
      value: `${padTime(hour24)}:${minuteStr}`,
      label: timeLabel,
    };
  });
};

const timeNextDay = generateTimeSlots(true);
const selectTime = generateTimeSlots();

export { selectTime, timeNextDay };

type CustomError = {
  status?: number;
  message?: string;
  data?: {
    message?: string;
    error?: {
      message?: string;
    };
  };
};

export function formatError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return String(error);
  }

  const err = error as Error;

  // Zod Validation Error
  if (error instanceof ZodError) {
    const fieldsErrors = error.errors.map(e => e.message);
    return fieldsErrors.join('. ');
  }

  // Axios Error
  if (err instanceof AxiosError) {
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
    if (err.message) {
      return err.message;
    }
    return 'An error occurred while making a request.';
  }

  if (typeof error === 'object') {
    const err = error as CustomError;
    if (err.data?.message) {
      return err.data.message;
    }
    if (err.data?.error?.message) {
      return err.data.error.message;
    }

    if (err.message) {
      return err.message;
    }
  }

  // Default error.message
  if (typeof err.message === 'string') {
    return err.message;
  }

  // Fallback
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions,
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions,
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions,
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const getHotelCompletionProgress = (
  completionSteps: CompletionSteps,
) => {
  const completed = Object.values(completionSteps).filter(Boolean).length;
  const totalSteps = Object.keys(completionSteps).length;
  return Math.round((completed / totalSteps) * 100);
};

export const createObjectOptions = <T extends readonly string[]>(
  constants: T,
): Array<{ value: T[number]; label: string }> => {
  return constants.map(constant => ({
    value: constant,
    label: constant
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '),
  }));
};

interface PerDayExample {
  baseOccupancy: string;
  baseRate: string;
  extraFeeLabel: string;
  extraFee: string;
  additionalRates?: never;
}

interface OccupancyBaseExample {
  baseOccupancy: string;
  additionalRates: Array<{
    guests: string;
    rate: string;
  }>;
  baseRate?: never;
  extraFeeLabel?: never;
  extraFee?: never;
}

export type PricingExample = PerDayExample | OccupancyBaseExample;
type PricingOption<T extends string> = {
  value: T;
  label: string;
  description: string;
  notes: string[];

  example: PricingExample;
};

export const formatValueString = (value: string) => {
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
export const createPricingOptions = <T extends readonly string[]>(
  constants: T,
): PricingOption<T[number]>[] => {
  return constants.map(constant => {
    const label =
      constant
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ') + ' Pricing';

    const metadata: Record<
      string,
      Omit<PricingOption<T[number]>, 'value' | 'label'>
    > = {
      PER_DAY: {
        description:
          'You charge a nightly rate for one or two people. Extra charge for additional guests.',
        notes: [
          'Recommended if you have only a few people staying in your rooms',
          'You’ll only have one rate, so it’s easier to manage',
        ],
        example: {
          baseOccupancy: '1 or 2 guests',
          baseRate: '$100/night',
          extraFeeLabel: 'Extra person fee',
          extraFee: '$20/night',
        } as PerDayExample,
      },
      OCCUPANCY_BASE: {
        description:
          'Set different nightly rates depending on the number of guests staying.',
        notes: [
          'Best for variable guest counts',
          'You control pricing per occupancy level',
        ],
        example: {
          baseOccupancy: '1 guest - $80/night',
          additionalRates: [
            { guests: '2 guests', rate: '$120/night' },
            { guests: '3 guests', rate: '$150/night' },
            { guests: '4 guests', rate: '$180/night' },
          ],
        } as OccupancyBaseExample,
      },
    };
    const { description, notes, example } = metadata[constant];

    return {
      value: constant,
      label,
      description,
      notes,
      example,
    };
  });
};

export const getQueryParams = (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get('search');
  const limit = searchParams.get('limit') || '10';
  const page = searchParams.get('page') || '1';
  const sortBy = searchParams.get('sortBy') || 'name';
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  const limitNum = parseInt(limit as string, 10);
  const pageNum = parseInt(page as string, 10);
  const skip = (pageNum - 1) * limitNum;
  return {
    search,
    limit,
    page,
    sortBy,
    sortOrder,
    skip,
    limitNum,
    pageNum,
  };
};
