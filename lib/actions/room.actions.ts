import { AvailabilityType, GetRoomType } from '@/types';
import { axiosInstance } from '../axios';
import { formatError } from '@/utils/format-error';
import { fetchClient } from '../fetch/client';

export async function getRoomById(
  hotelId: string,
  roomId: string,
): Promise<{
  room: GetRoomType | null;
  success: boolean;
  message?: string;
}> {
  try {
    const res = await axiosInstance.get(`/hotels/${hotelId}/rooms/${roomId}`);
    if (!res || res.status !== 200)
      throw new Error('No response from the server');
    const { room } = res.data.data;

    return { room, success: true };
  } catch (error) {
    return { room: null, success: false, message: formatError(error) };
  }
}

export type AddAvailabilityType = {
  data: AvailabilityType;
  hotelId: string;
  roomId: string;
};

export async function addRoomAvailability({
  data,
  hotelId,
  roomId,
}: AddAvailabilityType) {
  try {
    const res = await fetchClient.post(
      `/hotels/${hotelId}/rooms/${roomId}/availability`,
      data,
    );
    if (!res) throw new Error('No response from the server');

    return { success: true, message: 'Hotel policies updated successfully' };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
export async function updateRoomAvailability({
  data,
  hotelId,
  roomId,
}: AddAvailabilityType) {
  try {
    const res = await fetchClient.put(
      `/hotels/${hotelId}/rooms/${roomId}/availability`,
      data,
    );
    if (!res) throw new Error('No response from the server');

    return { success: true, message: 'Hotel policies updated successfully' };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
