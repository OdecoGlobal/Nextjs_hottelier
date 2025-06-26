import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const deleteFromCloudinary = async (publicIds: string | string[]) => {
  try {
    if (Array.isArray(publicIds)) {
      const result = await cloudinary.api.delete_resources(publicIds);
      return result;
    } else {
      const result = await cloudinary.uploader.destroy(publicIds);
      return result;
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};
