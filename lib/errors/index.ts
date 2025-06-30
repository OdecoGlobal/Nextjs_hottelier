/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import AppError from './app-error';
import { ZodError } from 'zod';

export function formatApiError(err: any) {
  console.log('API ERROR', err);

  let error = err;

  if (error instanceof AppError) {
    error = error;
  } else if (!error || typeof error !== 'object') {
    error = new AppError(String(error), 500);
  } else if (error instanceof ZodError) {
    const fieldsErrors = error.errors.map(e => e.message).join('. ');
    error = new AppError(fieldsErrors, 400);
  } else if (err.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') {
      const field = err.meta?.target ? err.meta.target[0] : 'Field';
      const message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists`;
      error = new AppError(message, 400);
    } else if (err.code === 'P5010') {
      error = new AppError(
        'Server connection timeout. Please try again later.',
        503,
      );
    } else if (err.code === 'P2025') {
      error = new AppError('Resource not found', 404);
    } else {
      error = new AppError(err.message || 'Internal server error', 500);
    }
  } else if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid Token. Please log in again', 401);
  } else if (err.name === 'TokenExpiredError') {
    error = new AppError('Your token has expired! Please log in again.', 401);
  } else if (err.name === 'ValidationError' && err.errors) {
    const messages = Object.values(err.errors)
      .map((el: any) => el.message)
      .join('. ');
    error = new AppError(`Invalid input data. ${messages}`, 400);
  } else {
    error = new AppError('Something went wrong', 500);
  }
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';

  const message = error.message || 'Something went wrong';
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json(
      {
        status,
        message,
        error,
        stack: error.stack,
      },
      { status: statusCode },
    );
  } else if (error.isOperational) {
    return NextResponse.json(
      {
        status,
        message,
      },
      { status: statusCode },
    );
  } else {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Something went wrong',
      },
      { status: 500 },
    );
  }
}
