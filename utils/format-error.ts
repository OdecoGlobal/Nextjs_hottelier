import { ZodError } from 'zod';
import { AxiosError } from 'axios';

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
