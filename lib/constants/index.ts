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
} from '@/types';
import { createObjectOptions } from '../utils';

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Hotellier';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'Modern Hotel listing web app built with Next.js';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'localhost:3000/api/v1';

export const hotelTypes = [
  {
    value: 'HOTEL',
    text: 'Hotel',
  },
  {
    value: 'MOTEL',
    text: 'Motel',
  },
  {
    value: 'GUESTHOUSE',
    text: 'Guest House',
  },
  {
    value: 'APARTMENT',
    text: 'Apartment',
  },
  {
    value: 'INN',
    text: 'Inn',
  },
];

export const currency = [
  {
    value: 'NGN',
    text: 'Naira',
  },
  {
    value: 'USD',
    text: 'US Dollar',
  },
  {
    value: 'EUR',
    text: 'Euros',
  },
  {
    value: 'GBP',
    text: 'British Pounds Sterling',
  },
];

export const steps = [
  'Basic Info',
  'Policies',
  'Amenities',
  'Photos',
  'Rooms and Rates',
  'Review',
];

export const PAYMENT_METHODS_OPTIONS = createObjectOptions(PAYMENT_METHODS);
export const CANCELLATION_POLICIES_OPTIONS = createObjectOptions(
  CANCELLATION_POLICIES
);
export const CANCELLATION_FEE_TYPE_OPTIONS = createObjectOptions(
  CANCELLATION_FEE_TYPE
);

export const DAYS_OBJ = createObjectOptions(DAYS);
export const LATE_CHECK_IN_FEE_TYPE_OPTIONS = createObjectOptions(
  LATE_CHECK_IN_FEE_TYPE
);
export const SURCHARGE_TYPE_OPTIONS = createObjectOptions(SURCHARGE_TYPE);
export const PET_SURCHARGE_TYPE_OPTIONS =
  createObjectOptions(PET_SURCHARGE_TYPE);
export const PET_FEE_DURATION_OPTIONS = createObjectOptions(PET_FEE_DURATION);
export const PET_FRIENDLY_FEATURES_OPTIONS = createObjectOptions(
  PET_FRIENDLY_FEATURES
);

export const GENERATED_NUMBERS = createObjectOptions(
  Array.from({ length: 10 }, (_, i) => (i + 1).toString())
);

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
