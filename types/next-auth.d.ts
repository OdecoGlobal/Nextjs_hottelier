// import { NextRequest } from 'next/server';
import { Hotel, User } from "@prisma/client";

declare module "next/server" {
  interface NextRequest {
    user?: Omit<User, "password">;
    hotel?: Hotel;
  }
}
