import { formatError } from '@/utils/format-error';
import { axiosInstance } from '../axios';
import {
  AddRoomType,
  AvailabilityType,
  CompletionSteps,
  CreateHotelApiResponse,
  GetRoomType,
  HotelAmenitiesType,
  HotelBasicInfoType,
  HotelImageUploadBody,
  HotelPolicyType,
  IncompleteHotelApiResponse,
} from '@/types';

export async function createNewHotel(formData: HotelBasicInfoType) {
  try {
    const res = await axiosInstance.post<CreateHotelApiResponse>(
      '/hotels',
      formData,
    );
    if (!res) throw new Error('An error occured while creating Hotel');

    return {
      success: true,
      message: 'Hotel basic info updated successfully',
      hotel: res.data.data.hotel,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateHotelBasicInfo(
  formData: HotelBasicInfoType,
  hotelId: string,
) {
  try {
    const res = await axiosInstance.patch(
      `/hotels/${hotelId}/basic-info`,
      formData,
    );
    if (!res) throw new Error('An error occured while creating Hotel');

    return {
      success: true,
      message: 'Hotel basic info updated successfully',
      hotel: res.data.data.hotel,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function addRoom(data: AddRoomType, hotelId: string) {
  try {
    const res = await axiosInstance.post(`/hotels/${hotelId}/rooms`, data);
    if (!res) throw new Error('Error occured while creating room');
    return {
      room: res.data.data.room,
      success: true,
      message: 'Room created successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateHotelPolicies(
  formData: HotelPolicyType,
  hotelId: string,
) {
  try {
    const res = await axiosInstance.put(
      `/hotels/${hotelId}/policies`,
      formData,
    );
    if (!res) throw new Error('An error occured while updating hotel policy');

    return {
      success: true,
      message: 'Hotel policies updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
export type HotelResponse = {
  id: string;
  basicInfo: HotelBasicInfoType;
  policies: HotelPolicyType;
  completionSteps: CompletionSteps;
  amenities: HotelAmenitiesType;
  hotelImages: HotelImageUploadBody;
  rooms: GetRoomType[];
  availability: AvailabilityType[];
  isFullyCompleted: boolean;

  currentStep: number;
};

export async function getHotelById(hotelId: string): Promise<{
  hotel: HotelResponse | null;
  success: boolean;
  message?: string;
}> {
  try {
    const res = await axiosInstance.get(`/hotels/${hotelId}`);
    if (!res || res.status !== 200)
      throw new Error('No response from the server');
    const { hotel } = res.data.data;

    return { hotel, success: true };
  } catch (error) {
    return { hotel: null, success: false, message: formatError(error) };
  }
}

export async function getHotelPolicies(hotelId: string): Promise<{
  data: HotelPolicyType | null;
  success: boolean;
  message?: string;
}> {
  try {
    const res = await axiosInstance(`/hotels/${hotelId}/policies`);
    if (!res || res.status !== 200)
      throw new Error('No response from the server');
    const data = res.data.data;
    return { data, success: true };
  } catch (error) {
    return { data: null, success: false, message: formatError(error) };
  }
}

export async function updateHotelAmenities(
  formData: HotelAmenitiesType,
  hotelId: string,
) {
  try {
    const res = await axiosInstance.put(
      `/hotels/${hotelId}/amenities`,
      formData,
    );
    if (!res)
      throw new Error('An error occured while updating hotel amenities');

    return {
      success: true,
      message: 'Hotel amenities updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function addHotelImages(
  formData: HotelImageUploadBody,
  hotelId: string,
) {
  try {
    const res = await axiosInstance.post(`/hotels/${hotelId}/images`, formData);
    if (!res) throw new Error('An error occured while updating hotel images');

    return {
      success: true,
      message: 'Hotel images updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function deletHotel(hotelId: string) {
  try {
    const res = await axiosInstance.delete(`hotels/${hotelId}`);
    if (!res) throw new Error('An error occured while updating hotel images');
    return {
      success: true,
      message: 'Hotel deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getIncompleteHotels(): Promise<IncompleteHotelApiResponse> {
  try {
    const res = await axiosInstance('hotels/onboard/incomplete');
    if (res.status !== 200) {
      throw new Error('Error fetching countries');
    }
    return res.data;
  } catch {
    return {
      data: [],
      status: 'error',
    };
  }
}
