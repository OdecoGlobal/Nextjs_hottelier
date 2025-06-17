import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImages = async (
  files: File[],
  folder: string,
  prefix: string
  //   targetArray: string[]
) => {
  const defaultTransformation = [
    { width: 2000, height: 1333, crop: 'fill' },
    { quality: 'auto:good' },
  ];

  const uploadedUrls: string[] = [];

  await Promise.all(
    files.map(async (file, i) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const b64 = buffer.toString('base64');
      const dataURI = `data:${file.type};base64,${b64}`;
      const publicId = `${prefix}-${i + 1}`;

      try {
        const result = await cloudinary.uploader.upload(dataURI, {
          folder,
          public_id: publicId,
          transformation: defaultTransformation,
        });
        uploadedUrls.push(result.secure_url);
      } catch (error) {
        console.error(`failed to upload ${prefix} image`, error);
      }
    })
  );
  return uploadedUrls;
};
