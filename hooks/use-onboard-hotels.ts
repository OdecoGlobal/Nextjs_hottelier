'use client';

import {
  addHotelBasicInfo,
  addHotelPolicies,
  AddPolicyType,
  CreateBasicInfoType,
  createNewHotel,
  getOnboardHotelById,
  getOnboardHotels,
  updateHotelBasicInfo,
} from '@/lib/actions/hotel.action';
import { useOnboardHotelByIdStore } from '@/stores/use-onboard-hotel-store';
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { API_CACHE_TIMEOUT } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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

export function useCreateNewHotel() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createNewHotel,
    onSuccess: data => {
      const { success, hotel, message } = data;
      if (success && hotel?.id) {
        queryClient.invalidateQueries({ queryKey: ['onboard-hotels'] });
        queryClient.invalidateQueries({
          queryKey: ['onboard-hotels-id', { hotelId: hotel.id }],
        });
        toast.success('Success', {
          description: message,
        });
        router.replace(`/onboard/hotel/${hotel?.id}/basic-info`);
      } else {
        toast.error('Error', {
          description: message || 'Something went wrong',
        });
      }
    },
    onError: error => {
      toast.error('error', {
        description: error.message || 'Failed to create hotel',
      });
    },
  });
}
export function useAddBasicInfo() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ data, hotelId }: CreateBasicInfoType) =>
      addHotelBasicInfo({ data, hotelId }),
    onSuccess: (data, { hotelId }) => {
      const { success, message } = data;
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['onboard-hotels'] });
        queryClient.invalidateQueries({
          queryKey: ['onboard-hotels-id', { hotelId }],
        });
        toast.success('Success', {
          description: message,
        });
        router.replace(`/onboard/hotel/${hotelId}/policies`);
      } else {
        toast.error('Error', {
          description: message || 'Something went wrong',
        });
      }
    },
    onError: error => {
      toast.error('error', {
        description: error.message || 'Failed to create hotel',
      });
    },
  });
}
export function useAddPolicy() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ data, hotelId }: AddPolicyType) =>
      addHotelPolicies({ data, hotelId }),
    onSuccess: (data, { hotelId }) => {
      const { success, message } = data;
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['onboard-hotels'] });
        queryClient.invalidateQueries({
          queryKey: ['onboard-hotels-id', { hotelId }],
        });
        toast.success('Success', {
          description: message,
        });
        router.replace(`/onboard/hotel/${hotelId}/amenities`);
      } else {
        toast.error('Error', {
          description: message || 'Something went wrong',
        });
      }
    },
    onError: error => {
      toast.error('error', {
        description: error.message || 'Failed to update hotel policy',
      });
    },
  });
}
export function useUpdateBasicInfo() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ data, hotelId }: CreateBasicInfoType) =>
      updateHotelBasicInfo({ data, hotelId }),
    onSuccess: (data, { hotelId }) => {
      const { success, message } = data;
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['onboard-hotels'] });
        queryClient.invalidateQueries({
          queryKey: ['onboard-hotels-id', { hotelId }],
        });
        toast.success('Success', {
          description: message,
        });
        router.replace(`/onboard/hotel/${hotelId}/basic-info`);
      } else {
        toast.error('Error', {
          description: message || 'Something went wrong',
        });
      }
    },
    onError: error => {
      toast.error('error', {
        description: error.message || 'Failed to create hotel',
      });
    },
  });
}

export function useOnboardHotelById({ hotelId }: { hotelId: string }) {
  const { setHotel, clearHotel } = useOnboardHotelByIdStore();
  const query = useQuery({
    queryKey: ['onboard-hotels-id', { hotelId }],
    queryFn: () => getOnboardHotelById(hotelId),
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
