import { NextResponse } from 'next/server';

export const POST = async () => {
  const res = NextResponse.json({ status: 'success' }, { status: 200 });

  // res.cookies.delete('jwt');
  res.cookies.set('jwt', '', {
    maxAge: 0,
    // path: '/',
  });

  return res;
};
