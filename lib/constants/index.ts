import {
  PAYMENT_METHODS,
  CANCELLATION_POLICIES,
  CANCELLATION_FEE_TYPE,
  DAYS,
  LATE_CHECK_IN_FEE_TYPE,
  SURCHARGE_TYPE,
  PET_SURCHARGE_TYPE,
  PET_FEE_DURATION,
  PET_FRIENDLY_FEATURES,
  WIFI_AREA_TYPE,
  HOTEL_AMENITY_CHARGE_TYPE,
  WIFI_SPEED_TYPE,
  WIFI_SURCHARGE_DURATION_TYPE,
  BREAKFAST_SCHEDULE_TYPE,
  ALLOWED_PET_TYPE,
  ROOM_TYPES,
  ROOM_CLASS,
  BED_TYPES,
  BATHROOM_TYPES,
  SHOWER_TYPES,
  ROOM_ESSENTIALS_TYPES,
  ROOM_LAYOUT_TYPES,
  ROOM_SIZE_UNIT_TYPE,
  ROOM_VIEW_TYPE,
  OUTDOOR_SPACE_TYPE,
  CLIMATE_CONTROL_TYPE,
  AIR_CONDITIONING_TYPE,
  HEATING_TYPE,
  PRICING_MODEL_TYPE,
  HOTEL_TYPES,
  SELF_CHECK_IN,
} from '@/types';
import { createObjectOptions, createPricingOptions } from '../utils';

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'RoaméLux';
export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const CACHE_TIME_OUT = 30 * 60;

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'Modern Hotel listing web app built with Next.js';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'localhost:3000/api/v1';

export const ACCEPTED_CURRENCIES = [
  {
    value: 'NGN',
    label: 'Naira',
  },
  {
    value: 'USD',
    label: 'US Dollar',
  },
  {
    value: 'EUR',
    label: 'Euros',
  },
  {
    value: 'GBP',
    label: 'British Pounds Sterling',
  },
];

export const steps = [
  'Basic Info',
  'Policies',
  'Amenities',
  'Photos',
  'Rooms',
  'Rates and Availability',
  'Review',
];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_PET_OPTIONS = createObjectOptions(ALLOWED_PET_TYPE);
export const HOTEL_TYPES_OPTIONS = createObjectOptions(HOTEL_TYPES);
export const WIFI_AREA_OPTIONS = createObjectOptions(WIFI_AREA_TYPE);
export const HOTEL_AMENITY_CHARGE_OPTION = createObjectOptions(
  HOTEL_AMENITY_CHARGE_TYPE,
);
export const WIFI_SPEED_OPTIONS = createObjectOptions(WIFI_SPEED_TYPE).map(
  option => {
    const speed = option.value.split('_')[1];
    return {
      ...option,
      label: `${speed}+ Mbps`,
    };
  },
);

export const PAYMENT_METHODS_OPTIONS = createObjectOptions(PAYMENT_METHODS);
export const CANCELLATION_POLICIES_OPTIONS = createObjectOptions(
  CANCELLATION_POLICIES,
);
export const CANCELLATION_FEE_TYPE_OPTIONS = createObjectOptions(
  CANCELLATION_FEE_TYPE,
);

export const DAYS_OBJ = createObjectOptions(DAYS);
export const LATE_CHECK_IN_FEE_TYPE_OPTIONS = createObjectOptions(
  LATE_CHECK_IN_FEE_TYPE,
);
export const SURCHARGE_TYPE_OPTIONS = createObjectOptions(SURCHARGE_TYPE);
export const PET_SURCHARGE_TYPE_OPTIONS =
  createObjectOptions(PET_SURCHARGE_TYPE);
export const PET_FEE_DURATION_OPTIONS = createObjectOptions(PET_FEE_DURATION);
export const PET_FRIENDLY_FEATURES_OPTIONS = createObjectOptions(
  PET_FRIENDLY_FEATURES,
);

export const BATHROOM_OPTIONS = createObjectOptions(BATHROOM_TYPES);
export const SHOWER_OPTIONS = createObjectOptions(SHOWER_TYPES);
export const ROOM_ESSENTIALS_OPTIONS = createObjectOptions(
  ROOM_ESSENTIALS_TYPES,
);

export const ROOM_LAYOUT_OPTIONS = createObjectOptions(ROOM_LAYOUT_TYPES);
export const ROOM_SIZE_UNIT_OPTIONS = createObjectOptions(ROOM_SIZE_UNIT_TYPE);
export const ROOM_VIEW_OPTION = createObjectOptions(ROOM_VIEW_TYPE);
export const OUTDOOR_SPACE_OPTIONS = createObjectOptions(OUTDOOR_SPACE_TYPE);

export const CLIMATE_CONTROL_OPTION = createObjectOptions(CLIMATE_CONTROL_TYPE);
export const AIR_CONDITIONING_OPTIONS = createObjectOptions(
  AIR_CONDITIONING_TYPE,
);
export const PRICING_MODEL_OPTIONS = createPricingOptions(PRICING_MODEL_TYPE);
//
export const HEATING_OPTION = createObjectOptions(HEATING_TYPE);
export const GENERATED_NUMBERS = createObjectOptions(
  Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
);

export const RADIO_BOOLEAN = [
  {
    label: 'Yes',
    value: 'true',
  },
  {
    label: 'No',
    value: 'false',
  },
];
export function generateNumbers(count: number) {
  return createObjectOptions(
    Array.from({ length: count }, (_, i) => (i + 1).toString()),
  );
}
export const WIFI_SURCHARGE_DURATION_OPTIONS = createObjectOptions(
  WIFI_SURCHARGE_DURATION_TYPE,
);

export const BREAKFAST_SCHEDULE_OPTIONS = createObjectOptions(
  BREAKFAST_SCHEDULE_TYPE,
);

export const ROOM_TYPES_OPTIONS = createObjectOptions(ROOM_TYPES);
export const ROOM_CLASS_OPTIONS = createObjectOptions(ROOM_CLASS);
export function getRoomTypeLabel(value: string): string {
  const option = ROOM_TYPES_OPTIONS.find(opt => opt.value === value);
  return option?.label || value;
}

export function getRoomClassLabel(value?: string): string {
  if (!value) return '';
  const option = ROOM_CLASS_OPTIONS.find(opt => opt.value === value);
  return option?.label || value;
}
export const BED_TYPES_OPTIONS = createObjectOptions(BED_TYPES);

export const SELF_CHECK_IN_OPTIONS = {
  ACCESS_CODE: {
    label: 'Access code',
    description: 'Provide guests with a door access code',
  },
  KEY_RETRIVAL_INSTRUCTION: {
    label: 'Key retrieval instructions',
    description: 'Instructions for where and how to get keys',
  },
  LOCK_BOX: {
    label: 'Lockbox instructions',
    description: 'Lockbox location and access details',
  },
  SMART_LOCK_CODE: {
    label: 'Smart lock code',
    description: 'Digital lock code for smart door locks',
  },
  EXPRESS_CHECKIN: {
    label: 'Express check-in',
    description: 'Self-service check-in process',
  },
} as const;

export const SELF_CHECK_IN_OPTIONS2 = createObjectOptions(SELF_CHECK_IN);
