'use client';

import {
  getOnboardHotelById,
  getOnboardHotels,
} from '@/lib/actions/hotel.action';
import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useEffect } from 'react';
// export async function getOnboardHotels({
//   queryKey,
// }: {
//   queryKey: [
//     string,
//     {
//       search?: string;
//       page?: string;
//       limit?: string;
//       status?: string;
//     },
//   ];
// }): Promise<OnboardHotelApiResponse> {
//   try {
//     const [key, { search, page, status, limit }] = queryKey;
//     void key;
//     const params = new URLSearchParams();
//     if (search) params.append('search', search);
//     if (status) params.append('status', status);
//     if (limit) params.append('limit', limit);
//     if (page) params.append('page', page);

//     const res = await fetch(`${API_URL}hotels/onboard?${params.toString()}`);

//     const data = await res.json();

//     return data;
//   } catch {
//     return {
//       data: [],
//       status: 'error',
//     };
//   }
// }

export function useOnboardHotel({
  search = '',
  page = '1',
  limit = '',
  status = '',
}) {
  return useQuery({
    queryKey: ['onboard-hotels', { search, page, limit, status }],
    queryFn: getOnboardHotels,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}

export function useOnboardHotelById({ hotelId }: { hotelId: string }) {
  const { setHotel, clearHotel } = useOnboardHotelByIdStore();
  const query = useQuery({
    queryKey: ['onboard-hotels', { hotelId }],
    queryFn: getOnboardHotelById,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
  useEffect(() => {
    if (query.data && query.isSuccess) {
      setHotel(query.data.hotel);
    }
  }, [query.data, query.isSuccess, setHotel]);

  useEffect(() => {
    return () => clearHotel();
  }, [hotelId, clearHotel]);
  return query;
}
