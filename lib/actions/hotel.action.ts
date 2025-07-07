import { formatError } from '@/utils/format-error';
import { axiosInstance } from '../axios';
import {
  AddRoomType,
  HotelAmenitiesType,
  HotelBasicInfoType,
  HotelImageUploadBody,
  HotelPolicyType,
  HotelType,
  NewHotelType,
} from '@/types';
import { serverFetch } from '../fetch/fetch';
import { API_CACHE_TIMEOUT } from '../constants';
import { fetchClient } from '../fetch/client';

type createHotelResponse = {
  success: boolean;
  message: string;
  hotel: HotelType | null;
};

export async function createNewHotel(
  data: NewHotelType,
): Promise<createHotelResponse> {
  try {
    const res = await fetchClient.post('/hotels', data);
    if (!res) throw new Error('An error occured while creating Hotel');
    console.log('NewHotel', res);

    return {
      success: true,
      message:
        'Congratulations!!!!🎉🎊: You just started you hotel onboarding process',
      hotel: res.data,
    };
  } catch (error) {
    return { success: false, message: formatError(error), hotel: null };
  }
}
type HotelStepsResponse = {
  success: boolean;
  message: string;
};
export type CreateBasicInfoType = {
  data: HotelBasicInfoType;
  hotelId: string;
};
export async function addHotelBasicInfo({
  data,
  hotelId,
}: CreateBasicInfoType): Promise<HotelStepsResponse> {
  try {
    const res = await fetchClient.post(`/hotels/${hotelId}/basic-info`, data);
    if (!res) throw new Error('An error occured while adding hotel basic info');

    return {
      success: true,
      message: 'Hotel basic info added successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateHotelBasicInfo({
  data,
  hotelId,
}: CreateBasicInfoType) {
  try {
    const res = await axiosInstance.patch(
      `/hotels/${hotelId}/basic-info`,
      data,
    );
    if (!res) throw new Error('An error occured while updating Hotel');

    return {
      success: true,
      message: 'Hotel basic info updated successfully',
      hotel: res.data.data.hotel,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export type AddPolicyType = {
  data: HotelPolicyType;
  hotelId: string;
};
export async function addHotelPolicies({ data, hotelId }: AddPolicyType) {
  try {
    const res = await axiosInstance.post(`/hotels/${hotelId}/policies`, data);
    if (!res) throw new Error('An error occured while adding hotel policy');

    return {
      success: true,
      message: 'Hotel policies added successfully',
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

export async function getHotelById(hotelId: string): Promise<{
  hotel: HotelType | null;
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

export async function submitHotel(hotelId: string) {
  try {
    const res = await axiosInstance.post(`hotels/${hotelId}/submit`);
    if (!res) throw new Error('An error occured while submitting hotel');
    return {
      success: true,
      message: 'Hotel submitted successfully',
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

type ApiResponse = {
  data: HotelType[];
  totalPages: number;
  totalCount: number;
};

export async function getOnboardHotels({
  queryKey,
}: {
  queryKey: [
    string,
    {
      search?: string;
      page?: string;
      limit?: string;
      status?: string;
    },
  ];
}): Promise<ApiResponse> {
  try {
    const [key, { search, page, status, limit }] = queryKey;
    void key;
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    if (limit) params.append('limit', limit);
    if (page) params.append('page', page);

    const res = await fetchClient.get(`hotels/onboard?${params.toString()}`, {
      cache: 'force-cache',
      next: { revalidate: API_CACHE_TIMEOUT, tags: ['hotel_onboard'] },
    });

    return res;
  } catch (error) {
    throw formatError(error);
  }
}
export async function getPreOnboardHotels(): Promise<ApiResponse> {
  try {
    const res = await serverFetch.get(`hotels/onboard`, {
      cache: 'force-cache',
      next: { revalidate: API_CACHE_TIMEOUT, tags: ['hotel_onboard'] },
    });

    return res;
  } catch (error) {
    throw formatError(error);
  }
}

export async function getOnboardHotelById(hotelId: string): Promise<HotelType> {
  try {
    const res = await fetchClient.get(`hotels/onboard/${hotelId}`, {
      // cache: 'force-cache',
      // next: {
      //   revalidate: API_CACHE_TIMEOUT,
      //   tags: ['hotel_onboard_id', `hotel_onboard_${hotelId}`],
      // },
    });
    const { hotel } = res.data;

    return hotel;
  } catch (error) {
    throw formatError(error);
  }
}
export async function getServerOnboardHotelById(
  hotelId: string,
): Promise<HotelType> {
  try {
    const res = await serverFetch.get(`hotels/onboard/${hotelId}`, {
      cache: 'force-cache',
      // next: {
      //   revalidate: API_CACHE_TIMEOUT,
      //   tags: ['hotel_onboard_id', `hotel_onboard_${hotelId}`],
      // },
    });
    const { hotel } = res.data;

    return hotel;
  } catch (error) {
    throw formatError(error);
  }
}
