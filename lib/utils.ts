import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";
import { ZodError } from "zod";
import { CompletionSteps } from "@/types";
import { AxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function generateSlug(text: string) {
  return slugify(text, { lower: true, strict: true });
}

const padTime = (num: number) => num.toString().padStart(2, "0");
const generateTimeSlots = (includeNextDay = false) => {
  return Array.from({ length: 48 }, (_, i) => {
    const totalMinutes = (6 * 60 + i * 30) % (24 * 60);
    const hour24 = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const period = hour24 < 12 ? "AM" : "PM";
    const hour12 = hour24 % 12 || 12;
    const minuteStr = minute === 0 ? "00" : "30";

    let timeLabel = `${hour12}:${minuteStr} ${period}`;

    // Handle special cases
    if (hour24 === 12 && minute === 0) timeLabel = "Noon";
    if (hour24 === 0 && minute === 0) timeLabel = "Midnight";

    // Handle "next day" notation if enabled
    if (
      includeNextDay &&
      hour24 >= 0 &&
      hour24 < 6 &&
      !(hour24 === 0 && minute === 0)
    ) {
      timeLabel += " the next day";
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

export function formatError(error: unknown): string {
  if (!error || typeof error !== "object") {
    return String(error);
  }

  const err = error as Error;

  // Zod Validation Error
  if (error instanceof ZodError) {
    const fieldsErrors = error.errors.map((e) => e.message);
    return fieldsErrors.join(". ");
  }

  // Axios Error
  if (err instanceof AxiosError) {
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
    if (err.message) {
      return err.message;
    }
    return "An error occurred while making a request.";
  }

  // Default error.message
  if (typeof err.message === "string") {
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
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const getHotelCompletionProgress = (
  completionSteps: CompletionSteps
) => {
  const completed = Object.values(completionSteps).filter(Boolean).length;
  return Math.round((completed / 6) * 100);
};

export const createObjectOptions = <T extends readonly string[]>(
  constants: T
): Array<{ value: T[number]; label: string }> => {
  return constants.map((constant) => ({
    value: constant,
    label: constant
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
  }));
};
