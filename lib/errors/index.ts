import { NextResponse } from "next/server";
import AppError from "./app-error";
import { ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatApiError(err: any) {
  console.log("API ERROR", err);

  let error = err;
  if (!error || typeof error !== "object") {
    error = new AppError(String(error), 500);
  } else if (error instanceof ZodError) {
    const fieldsErrors = error.errors.map((e) => e.message).join(". ");
    error = new AppError(fieldsErrors, 400);
  } else if (err.name === "PrismaClientKnownRequestError") {
    if (err.code === "P2002") {
      const field = err.meta?.target ? err.meta.target[0] : "Field";
      const message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists`;
      error = new AppError(message, 400);
    } else {
      error = new AppError(err.message || "Database error", 500);
    }
  } else if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid Token. Please log in again", 401);
  } else if (err.name === "TokenExpiredError") {
    error = new AppError("Your token has expired! Please log in again.", 401);
  } else if (err.name === "ValidationError" && err.errors) {
    const messages = Object.values(err.errors)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((el: any) => el.message)
      .join(". ");
    error = new AppError(`Invalid input data. ${messages}`, 400);
  } else if (typeof error.message === "string") {
    error = new AppError(err.message, 500);
  } else {
    error = new AppError("Something went wrong", 500);
  }
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";

  const message = error.message || "Something went wrong";
  if (process.env.NODE_ENV === "development") {
    return NextResponse.json(
      {
        status,
        message,
        error,
        stack: error.stack,
      },
      { status: statusCode }
    );
  } else if (error.isOperational) {
    return NextResponse.json(
      {
        status,
        message,
      },
      { status: statusCode }
    );
  } else {
    return NextResponse.json(
      {
        status: "error",
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
