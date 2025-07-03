import { HotelType } from '@/types';
import { create } from 'zustand';
interface HotelByIdState {
  hotel: HotelType | null;
  setHotel: (hotel: HotelType) => void;
  clearHotel: () => void;
}

export const useOnboardHotelByIdStore = create<HotelByIdState>(set => ({
  hotel: null,
  setHotel: hotel => set({ hotel }),
  clearHotel: () => set({ hotel: null }),
}));
