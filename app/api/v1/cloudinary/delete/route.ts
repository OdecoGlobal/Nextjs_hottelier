import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const { public_id } = await req.json();
  console.log(public_id, 'server');
  if (!public_id) {
    return new Response('Missing public_id', { status: 400 });
  }
  try {
    await cloudinary.uploader.destroy(public_id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
