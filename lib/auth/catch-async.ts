import { NextRequest, NextResponse } from "next/server";

type NextHandler = (
  req: NextRequest,
  context?: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

export function catchAsync(fn: NextHandler) {
  return async (
    req: NextRequest,
    context?: { params: Promise<Record<string, string>> }
  ) => {
    try {
      return await fn(req, context);
    } catch (error) {
      console.error("Async Error:", error);

      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  };
}
