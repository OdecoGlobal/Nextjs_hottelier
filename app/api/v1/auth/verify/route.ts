import { catchAsync } from "@/lib/auth/catch-async";
import { verifyAndGetUser } from "@/lib/auth/util";
import { NextRequest, NextResponse } from "next/server";

export const GET = catchAsync(async (req: NextRequest) => {
  const { token, user } = await verifyAndGetUser(req);
  return NextResponse.json(
    {
      status: "success",
      data: { token, user },
    },
    { status: 200 }
  );
});
