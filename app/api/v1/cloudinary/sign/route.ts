import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';

export async function POST(req: NextRequest) {
  try {
    const { folder } = await req.json();
    if (!folder) throw new AppError('Folder is required', 400);

    const timestamp = Math.floor(Date.now() / 1000);
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret)
      throw new AppError('Cloudinary credentials not configured', 500);

    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

    const signature = crypto
      .createHash('sha1')
      .update(paramsToSign.toString() + apiSecret)
      .digest('hex');

    return NextResponse.json({
      timestamp,
      signature,
      cloudName,
      apiKey,
      uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    });
  } catch (error) {
    return formatApiError(error);
  }
}
