import {
  createHotelApiResponseSchema,
  onboardHotelApiResponseSchema,
  hotelAmenitiesSchema,
  hotelPolicySchema,
} from '@/lib/schemas/grouped-validators';
import {
  userSchema,
  signUpFormSchema,
  loginSchema,
  insertCountrySchema,
  insertStateSchema,
  insertCitySchema,
  hotelBasicInfoSchema,
  HotelImageUploadBodySchema,
  completeRoomSchema,
  getRoomSchema,
  availabilitySchema,
  verifyOtpSchema,
  basicInfoSchema,
  completionStepsSchema,
  hotelSchema,
  currencySchema,
  userRoleSchema,
  createHotelSchema,
} from '@/lib/schemas/validator';
import { z } from 'zod';

export const HOTEL_TYPES = [
  'HOTEL',
  'MOTEL',
  'GUEST_HOUSE',
  'INN',
  'APARTMENT',
] as const;
export const CURRENCIES = ['NGN', 'USD', 'EUR', 'GBP'] as const;

export type CurrencyType = z.infer<typeof currencySchema>;
// ROOMS
export const BATHROOM_TYPES = ['PRIVATE', 'PARTIALLY_OPEN', 'SHARED'] as const;
export const SHOWER_TYPES = [
  'BATHTUB',
  'SEPARATE_BATHTUB_AND_SHOWER',
  'SHOWER',
  'BATHTUB_OR_SHOWER',
] as const;
export const PRICING_MODEL_TYPE = ['PER_DAY', 'OCCUPANCY_BASE'] as const;

export const ROOM_ESSENTIALS_TYPES = [
  'FREE_TOILETRIES',
  'SOAP',
  'SHAMPOO',
  'TOILET_PAPER',
  'HAIR_DRYER',
] as const;

export const CLIMATE_CONTROL_TYPE = ['AIR_CONDITIONING', 'HEATING'] as const;

export const AIR_CONDITIONING_TYPE = [
  'AIR_CONDITIONING',
  'IN_ROOM_CLIMATE_CONTROL',
] as const;
export const HEATING_TYPE = ['HEATING', 'IN_ROOM_CLIMATE_CONTROL'] as const;

export const ROOM_VIEW_TYPE = [
  'BAY',
  'BEACH',
  'DESERT',
  'GOLF',
  'CITY',
  'GARDEN',
  'CANAL',
  'LAKE',
  'OCEAN',
  'PARK',
] as const;

export const ROOM_SIZE_UNIT_TYPE = ['SQUARE_FEET', 'SQUARE_METER'] as const;

export const OUTDOOR_SPACE_TYPE = [
  'BALCONY',
  'FURNISHED_BALCONY',
  'BALCONY_OR_PATIO',
  'FURNISHED_BALCONY_OR_PATIO',
  'PATIO',
  'FURNISHED_PATIO',
  'DECK',
] as const;
export const ROOM_LAYOUT_TYPES = [
  'DESK',
  'SEPARATE_SITTING_AREA',
  'LAPTOP_FRIENDLY_WORK_SPACE',
  'PRIVATE_POOL',
] as const;

export const BED_TYPES = [
  'SINGLE_OR_TWIN',
  'LARGE_SINGLE_OR_LARGE_TWIN',
  'DOUBLE',
  'QUEEN',
  'KING',
  'WATER',
  'BUNK',
] as const;
export const ROOM_TYPES = [
  'DOUBLE_OR_TWIN',
  'DOUBLE',
  'SINGLE',
  'TWIN',
  'SUITE',
  'STUDIO',
] as const;

export const ROOM_CLASS = [
  'BASIC',
  'STANDARD',
  'DELUXE',
  'ECONOMY',
  'FAMILY',
  'EXECUTIVE',
  'PRESIDENTIAL',
] as const;

// POLICIES
export const CANCELLATION_FEE_TYPE = [
  'FIRST_NIGHT_PLUS_TAX',
  'AMOUNT_50',
  'AMOUNT_100',
] as const;
export const CANCELLATION_POLICIES = [
  'FREE_CANCELLATION',
  'HOUR_24',
  'HOUR_48',
  'HOUR_72',
  'NO_REFUND',
] as const;
export const PET_POLICIES = [
  'NOT_ALLOWED',
  'ALLOWED_WITH_FEE',
  'ALLOWED_FREE',
] as const;
export const SMOKING_POLICIES = [
  'NO_SMOKING',
  'SMOKING_ALLOWED',
  'DESIGNATED_AREAS',
] as const;
export const PAYMENT_METHODS = [
  'CREDIT_CARD',
  'DEBIT_CARD',
  'CASH',
  'BANK_TRANSFER',
  'DIGITAL_WALLET',
] as const;

export const SELF_CHECK_IN = [
  'ACCESS_CODE',
  'KEY_RETRIVAL_INSTRUCTION',
  'LOCK_BOX',
  'SMART_LOCK_CODE',
  'EXPRESS_CHECKIN',
] as const;

export const DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

export const SURCHARGE_TYPE = ['AMOUNT', 'PERCENT', 'FEE_VARIES'] as const;
export const PET_SURCHARGE_TYPE = ['PER_PET', 'PER_ACCOMODATION'] as const;
export const PET_FEE_DURATION = [
  'PER_DAY',
  'PER_NIGHT',
  'PER_STAY',
  'PER_WEEK',
] as const;

export const HOTEL_CHARGE_TYPE = ['FREE', 'SURCHARGE'] as const;
export const ALLOWED_PET_TYPE = [
  'ONLY_DOGS',
  'ONLY_CATS',
  'ONLY_DOGS_AND_CATS',
] as const;

export const PET_RESTRICTION_TYPE = [
  'ONLY_SMOKING_ROOMS',
  'ONLY_SPECIFIC_AREAS',
  'CANNOT_BE_LEFT_UNATTENDED',
  'OTHERS',
] as const;

export const PET_FRIENDLY_FEATURES = [
  'FOOD_AND_WATER_BOWL',
  'LITTER_BOX',
  'DOG_EXERCISE_ROOM',
  'PET_SITTING_SERVICES',
  'PET_GROOMING_SERVICES',
] as const;

// HOTEL AMENITIES
export const WIFI_AREA_TYPE = ['IN_GUEST_ROOM', 'IN_PUBLIC_AREA'] as const;

export const WIFI_SPEED_TYPE = [
  'MBPS_25',
  'MBPS_50',
  'MBPS_100',
  'MBPS_200',
] as const;

export const WIFI_SURCHARGE_DURATION_TYPE = [
  'PER_STAY',
  'PER_HOUR',
  'PER_NIGHT',
  'PER_DAY',
  'PER_WEEK',
] as const;

export const BREAKFAST_SCHEDULE_TYPE = [
  'DAILY',
  'WEEKDAYS',
  'WEEKENDS',
] as const;

export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
];

export const ROLES = ['USER', 'AGENT', 'ADMIN'] as const;
export type Roles = z.infer<typeof userRoleSchema>;
export const HotelStatus = [
  'DRAFT',
  'IN_PROGRESS',
  'PENDING_REVIEW',
  'PROCESSING',
  'APPROVED',
  'REJECTED',
  'ACTIVE',
  'INACTIVE',
] as const;

export type User = z.infer<typeof userSchema>;
export type signUpInput = z.infer<typeof signUpFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VeifyOTPType = z.infer<typeof verifyOtpSchema>;
export type AdminAgentRole = 'ADMIN' | 'AGENT';
export type ApiSessionResponse = {
  data: Session;
};
export type Session = {
  user: User;
  token: string;
};

export type CountryData = z.infer<typeof insertCountrySchema>;
export type StateData = z.infer<typeof insertStateSchema>;
export type CityData = z.infer<typeof insertCitySchema>;
export type GeneratedTypes = {
  label: string;
  value: string;
};

// HOTELS
export type NewHotelType = z.infer<typeof createHotelSchema>;
export type HotelType = z.infer<typeof hotelSchema>;
export type HotelStatusType = (typeof HotelStatus)[number];
export type HotelAmenitiesType = z.infer<typeof hotelAmenitiesSchema>;
export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type HotelPolicyType = z.infer<typeof hotelPolicySchema>;
export type AddRoomType = z.infer<typeof completeRoomSchema>;
export type GetRoomType = z.infer<typeof getRoomSchema>;
export type CompletionSteps = z.infer<typeof completionStepsSchema>;
export type HotelBasicInfoType = z.infer<typeof hotelBasicInfoSchema>;
export type HotelImageUploadBody = z.infer<typeof HotelImageUploadBodySchema>;
export type AvailabilityType = z.infer<typeof availabilitySchema>;

export type StepKey =
  | 'step0_init'
  | 'step1_basic_info'
  | 'step2_policies'
  | 'step3_amenities'
  | 'step4_hotel_images'
  | 'step5_rooms'
  | 'step6_rates_and_availability'
  | 'step7_review';

export const ImageType = z.enum(['COVER', 'EXTERIOR', 'INTERIOR']);
export type ImageType = z.infer<typeof ImageType>;

export type CreateHotelApiResponse = z.infer<
  typeof createHotelApiResponseSchema
>;
export type OnboardHotelApiResponse = z.infer<
  typeof onboardHotelApiResponseSchema
>;
