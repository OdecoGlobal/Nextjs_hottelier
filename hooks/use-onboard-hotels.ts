'use client';

import {
  AddAmenitiesType,
  addHotelAmenities,
  addHotelBasicInfo,
  addHotelImages,
  AddHotelImagesType,
  addHotelPolicies,
  addNewRoom,
  AddPolicyType,
  CreateBasicInfoType,
  createNewHotel,
  CreateRoomType,
  getOnboardHotelById,
  getOnboardHotels,
  submitHotel,
  updateHotelBasicInfo,
  updateHotelPolicies,
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
import {
  AddAvailabilityType,
  addRoomAvailability,
} from '@/lib/actions/room.actions';

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
        router.refresh();
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
export function useUpdatePolicy() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ data, hotelId }: AddPolicyType) =>
      updateHotelPolicies({ data, hotelId }),
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
        router.refresh();
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

export function useAddAmenities() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ data, hotelId }: AddAmenitiesType) =>
      addHotelAmenities({ data, hotelId }),
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
        router.replace(`/onboard/hotel/${hotelId}/images`);
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

export function useAddHotelImages() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ data, hotelId }: AddHotelImagesType) =>
      addHotelImages({ data, hotelId }),
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
        router.replace(`/onboard/hotel/${hotelId}/rooms`);
      } else {
        toast.error('Error', {
          description: message || 'Something went wrong',
        });
      }
    },
    onError: error => {
      toast.error('error', {
        description: error.message || 'Failed to update hotel images',
      });
    },
  });
}

export function useAddNewRooms() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ data, hotelId }: CreateRoomType) =>
      addNewRoom({ data, hotelId }),
    onSuccess: (data, { hotelId }) => {
      const { success, message, room } = data;
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['onboard-hotels'] });
        queryClient.invalidateQueries({
          queryKey: ['onboard-hotels-id', { hotelId }],
        });
        toast.success('Success', {
          description: message,
        });
        router.replace(`/onboard/hotel/${hotelId}/rooms/${room?.id}/rates`);
      } else {
        toast.error('Error', {
          description: message || 'Something went wrong',
        });
      }
    },
    onError: error => {
      toast.error('error', {
        description: error.message || 'Failed to update hotel images',
      });
    },
  });
}
export function useAddRoomAvailability() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ data, hotelId, roomId }: AddAvailabilityType) =>
      addRoomAvailability({ data, hotelId, roomId }),
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
        router.replace(`/onboard/hotel/${hotelId}/reviews`);
      } else {
        toast.error('Error', {
          description: message || 'Something went wrong',
        });
      }
    },
    onError: error => {
      toast.error('error', {
        description: error.message || 'Failed to update room availability',
      });
    },
  });
}

export function useSubmitNewHotel() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: submitHotel,
    onSuccess: (data, hotelId) => {
      const { success, message } = data;
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['onboard-hotels'] });
        queryClient.invalidateQueries({
          queryKey: ['onboard-hotels-id', { hotelId }],
        });
        toast.success('Success', {
          description: message,
        });
        router.replace('/onboard');
      } else {
        toast.error('Error', {
          description: message || 'Something went wrong',
        });
      }
    },
    onError: error => {
      toast.error('error', {
        description: error.message || 'Failed to submit hotel',
      });
    },
  });
}
