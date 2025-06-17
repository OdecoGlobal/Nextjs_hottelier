import { axiosInstance } from '../axios';

type UploadResult = {
  secure_url: string;
  public_id: string;
};

export const uploadToCloudinary = async (
  file: File,
  folder: string
): Promise<UploadResult> => {
  try {
    const signResponse = await axiosInstance.post('cloudinary/sign', {
      folder,
    });

    const { timestamp, signature, apiKey, uploadUrl } = await signResponse.data;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('folder', folder);

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    const uploadData = await uploadResponse.json();

    return {
      secure_url: uploadData.secure_url,
      public_id: uploadData.public_id,
    };
  } catch (error) {
    throw error;
  }
};
