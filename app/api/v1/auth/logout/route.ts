import { NextResponse } from "next/server";

export const POST = async () => {
  const res = NextResponse.json({ status: "success" }, { status: 200 });

  res.cookies.delete("jwt");

  //   res.cookies.set({
  //     name: "jwt",
  //     httpOnly: true,
  //     value: "",
  //     expires: new Date(0),
  //   });
  return res;
};
