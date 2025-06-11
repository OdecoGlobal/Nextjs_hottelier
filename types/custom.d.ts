import { NextRequest } from "next/server";
import { User } from "@prisma/client";

export type AuthenticatedRequest = NextRequest & {
  user: User;
};
