'use client';

import {
  getOnboardHotelById,
  getOnboardHotels,
} from '@/lib/actions/hotel.action';
import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useEffect } from 'react';
import { API_CACHE_TIMEOUT } from '@/lib/constants';

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
    staleTime: API_CACHE_TIMEOUT,
  });
}

export function useOnboardHotelById({ hotelId }: { hotelId: string }) {
  const { setHotel, clearHotel } = useOnboardHotelByIdStore();
  const query = useQuery({
    queryKey: ['onboard-hotels', { hotelId }],
    queryFn: getOnboardHotelById,
    placeholderData: keepPreviousData,
    staleTime: API_CACHE_TIMEOUT * 1000,
    enabled: !!hotelId,
  });
  useEffect(() => {
    if (query.data && query.isSuccess) {
      setHotel(query.data);
    }
  }, [query.data, query.isSuccess, setHotel]);

  useEffect(() => {
    return () => clearHotel();
  }, [hotelId, clearHotel]);
  return query;
}
