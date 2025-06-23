'use server';

import { axiosInstance } from '../axios';
// import { fetchInstance } from '../fetch';
import { formatError } from '../utils';

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
