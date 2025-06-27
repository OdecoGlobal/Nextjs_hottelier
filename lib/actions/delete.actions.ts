'use server';

import { formatError } from '@/utils/format-error';
import { axiosInstance } from '../axios';

export async function deleteRoom(hotelId: string, roomId: string) {
  try {
    const res = await axiosInstance.delete(`hotels/${hotelId}/rooms/${roomId}`);
    if (!res) throw new Error('An error occured while deleting room');
    return {
      success: true,
      message: 'Room deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
