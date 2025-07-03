import {
  PAYMENT_METHODS,
  CANCELLATION_POLICIES,
  CANCELLATION_FEE_TYPE,
  SMOKING_POLICIES,
  DAYS,
  SELF_CHECK_IN,
  LATE_CHECK_IN_FEE_TYPE,
  SURCHARGE_TYPE,
  PET_SURCHARGE_TYPE,
  PET_FEE_DURATION,
  ALLOWED_PET_TYPE,
  PET_RESTRICTION_TYPE,
  PET_FRIENDLY_FEATURES,
  ROOM_TYPES,
  ROOM_CLASS,
  BED_TYPES,
  BATHROOM_TYPES,
  SHOWER_TYPES,
  ROOM_ESSENTIALS_TYPES,
  CLIMATE_CONTROL_TYPE,
  AIR_CONDITIONING_TYPE,
  HEATING_TYPE,
  ROOM_VIEW_TYPE,
  ROOM_SIZE_UNIT_TYPE,
  OUTDOOR_SPACE_TYPE,
  ROOM_LAYOUT_TYPES,
  ALLOWED_FILE_TYPES,
  BREAKFAST_SCHEDULE_TYPE,
  HOTEL_AMENITY_CHARGE_TYPE,
  WIFI_SURCHARGE_DURATION_TYPE,
  WIFI_SPEED_TYPE,
  WIFI_AREA_TYPE,
  PRICING_MODEL_TYPE,
  ROLES,
  HotelStatus,
  ImageType,
  CURRENCIES,
} from '@/types';
import z from 'zod';
import { MAX_FILE_SIZE } from '../constants';

export const userSchema = z.object({
  id: z.string().min(1, 'Id is required'),
  email: z.string().email('invalid email address'),
  emailVerified: z.date().nullable(),
  userName: z.string().min(3, 'User name must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 digits').nullish(),
  image: z.string().nullish(),
  passwordChangedAt: z.date().nullish(),
  paymentMethod: z.enum(PAYMENT_METHODS).nullish(),
  role: z.enum(ROLES),
});

export const loginSchema = z.object({
  email: z.string().email('invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export const signUpFormSchema = z
  .object({
    userName: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ['confirmPassword'],
  });

export const currencySchema = z.enum(CURRENCIES);
// HOTELS ZOD SCHEMA
export const baseHotelSchema = z.object({
  name: z.string().min(4, 'Hotel name must be at least 4 characters'),
  address: z.string().min(3, 'Address must be at least 3 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  state: z.string().min(3, 'State must be at least 3 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  zipCode: z.string().min(1, 'Zipcode must be at least 1 character'),
  lat: z.number(),
  lng: z.number(),
  hotelType: z.enum(['HOTEL', 'MOTEL', 'GUESTHOUSE', 'INN', 'APARTMENT']),
  roomUnitTotal: z.coerce
    .number()
    .min(1, 'There must be at least one room or unit'),
  acceptedCurrency: currencySchema,
});

export const hotelBasicInfoSchema = baseHotelSchema.extend({
  countryCode: z.string().nullish(),
  countryId: z.string().nullish(),
  stateId: z.string().nullish(),
  stateCode: z.string().nullish(),
});

export const basicInfoSchema = hotelBasicInfoSchema.extend({
  id: z.string().uuid(),
  hotelId: z.string().uuid(),
  slug: z.string(),
  rating: z.string(),
  isCompleted: z.boolean(),
  completedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const completionStepsSchema = z.object({
  step1_basic_info: z.boolean(),
  step2_policies: z.boolean(),
  step3_amenities: z.boolean(),
  step4_hotel_images: z.boolean(),
  step5_rooms: z.boolean(),
  step6_rate_and_availability: z.boolean(),
  step7_review: z.boolean(),
});

export const verifyOtpSchema = z.object({
  inputOTP: z.string().min(6, 'One Time Password must be least 6 digits'),
  email: z.string().email(),
});
export const baseHotelPolicySchema = z.object({
  paymentMethods: z
    .array(z.enum(PAYMENT_METHODS))
    .min(1, 'Please select at least one payment method'),
  isDepositRequired: z.boolean(),
  depositAmount: z.coerce.number().nullish(),
  isTaxIncludedInRoomRates: z.boolean(),
  cancellationPolicy: z.enum(CANCELLATION_POLICIES),
  cancellationFeeType: z.enum(CANCELLATION_FEE_TYPE).nullish(),
  smokingPolicy: z.enum(SMOKING_POLICIES),
  hasAdditionalPolicy: z.boolean(),
  additionalPolicy: z.array(z.object({ value: z.string() })).optional(),

  isFrontDesk: z.boolean(),
  isFrontDeskEveryDay: z.boolean().optional(),
  isFrontDeskOpen24Hours: z.boolean().optional(),
  frontDeskScheduleStartDay: z.enum(DAYS).optional(),
  frontDeskScheduleEndDay: z.enum(DAYS).optional(),
  frontDeskStartTime: z.string().optional(),
  frontDeskEndTime: z.string().optional(),
  isSelfCheckIn: z.boolean(),
  selfCheckInType: z.enum(SELF_CHECK_IN).optional(),

  checkInStartTime: z.string().min(1, 'Check in start time is required'),
  checkInEndTime: z.string().optional(),
  isOpen24Hours: z.boolean().optional(),
  isLateCheckIn: z.boolean().optional(),
  lateCheckInType: z.enum(LATE_CHECK_IN_FEE_TYPE).optional(),
  surchargeType: z.enum(SURCHARGE_TYPE).optional(),
  surchargeAmount: z.coerce.number().optional(),

  lateCheckInStartTime: z.string().optional(),
  lateCheckInEndTime: z.string().optional(),
  isAdvancedNoticeCheckIn: z.boolean().optional(),
  advanceNoticeCheckInTime: z.string().optional(),
  checkOutTime: z.string(),
  minCheckInAgeAllowed: z.coerce.number(),

  isPetAllowed: z.boolean(),
  isPetSurcharged: z.boolean().optional(),
  petSurchargeAmount: z.coerce.number().optional(),
  petSurchargeType: z.enum(PET_SURCHARGE_TYPE).nullish(),
  petSurchargeDuration: z.enum(PET_FEE_DURATION).nullish(),
  isMaxFeePerStay: z.boolean().optional(),
  maxFeePerStayAmount: z.coerce.number().nullish(),
  isPetFeeVaried: z.boolean().optional(),
  allowedPetType: z.enum(ALLOWED_PET_TYPE).nullish(),
  isPetRestricted: z.boolean().optional(),
  petRestrictionType: z.array(z.enum(PET_RESTRICTION_TYPE)).optional(),
  isMaxWeightPerPet: z.boolean().optional(),
  petMaxWeight: z.coerce.number().nullish(),
  isPetDeposit: z.boolean().optional(),
  petDepositType: z.enum(PET_FEE_DURATION).nullish(),
  petDepositAmount: z.coerce.number().nullish(),
  isPetCleaningFee: z.boolean().optional(),
  petCleaningFee: z.coerce.number().nullish(),
  petFriendlyFeatures: z.array(z.enum(PET_FRIENDLY_FEATURES)).optional(),
});

export const baseHotelAmenitiesSchema = z.object({
  isWifi: z.boolean(),
  wifiArea: z.array(z.enum(WIFI_AREA_TYPE)).optional(),
  roomWifiChargeType: z.enum(HOTEL_AMENITY_CHARGE_TYPE).nullish(),
  roomWifiSpeed: z.enum(WIFI_SPEED_TYPE).nullish(),
  roomWifiSurchargeAmout: z.coerce.number().optional(),
  roomWifiSurchargeDuration: z.enum(WIFI_SURCHARGE_DURATION_TYPE).nullish(),
  roomDeviceLimited: z.boolean().optional(),
  roomDeviceLimitNumber: z.coerce.number().nullish(),

  publicWifiChargeType: z.enum(HOTEL_AMENITY_CHARGE_TYPE).nullish(),
  publicWifiSpeed: z.enum(WIFI_SPEED_TYPE).nullish(),
  publicWifiSurchargeAmout: z.coerce.number().optional(),
  publicWifiSurchargeDuration: z.enum(WIFI_SURCHARGE_DURATION_TYPE).nullish(),
  publicDeviceLimited: z.boolean().optional(),
  publicDeviceLimitNumber: z.coerce.number().nullish(),

  isBreakfast: z.boolean(),
  breakfastChargeType: z.enum(HOTEL_AMENITY_CHARGE_TYPE).nullish(),
  breakfastSurchargeAmount: z.coerce.number().optional(),
  breakfastSchedule: z.enum(BREAKFAST_SCHEDULE_TYPE).nullish(),
  breakfastStartTime: z.string().nullish(),
  breakfastEndTime: z.string().nullish(),
});

export const cloudinaryImageSchema = z.object({
  imageUrl: z.string().url('Invalid image URL'),
  public_id: z.string().min(1, 'Missing public_id'),
});
export const HotelImageSchema = z.object({
  imageUrl: z.string(),
  public_id: z.string(),
  imageType: ImageType,
});

export const ImageObjectArraySchema = z
  .array(cloudinaryImageSchema)
  .transform(arr => arr?.filter(Boolean));

export const HotelImageUploadBodySchema = z
  .object({
    coverImages: ImageObjectArraySchema,
    exteriorImages: ImageObjectArraySchema,
    interiorImages: ImageObjectArraySchema,
  })
  .refine(data => {
    const totalImages = [
      ...data.coverImages,
      ...data.exteriorImages,
      ...data.interiorImages,
    ].length;

    return totalImages > 0;
  }, 'At least one image URL must be provided');

export const baseRoomAmenitiesSchema = z.object({
  bathroomType: z.enum(BATHROOM_TYPES),
  bathroomNumber: z.coerce
    .number()
    .min(1, 'There should be at least one bathroom in a room'),
  showerType: z.enum(SHOWER_TYPES),
  roomEssential: z.array(z.enum(ROOM_ESSENTIALS_TYPES)).optional(),
  isTowelProvided: z.boolean(),
  climateControl: z
    .array(z.enum(CLIMATE_CONTROL_TYPE))
    .min(1, 'Select at least one option'),
  airConditionType: z.enum(AIR_CONDITIONING_TYPE).nullish(),
  heatingType: z.enum(HEATING_TYPE).optional(),
  isRoomView: z.boolean(),
  roomViewType: z.enum(ROOM_VIEW_TYPE).nullish(),
  roomSize: z.coerce.number().nonnegative(),
  roomSizeUnit: z.enum(ROOM_SIZE_UNIT_TYPE),
  isOutDoorSpace: z.boolean(),
  outDoorSpaceType: z.enum(OUTDOOR_SPACE_TYPE).nullish(),
  roomLayout: z.array(z.enum(ROOM_LAYOUT_TYPES)).optional(),
});

export const baseRoomSchema = z.object({
  name: z.string().min(3, 'Room name must be at least 3 characters'),
  roomType: z.enum(ROOM_TYPES),
  roomClass: z.enum(ROOM_CLASS).optional(),
  maxOccupancy: z.coerce.number().min(1, 'Should be at least  one'),
  bedType: z.enum(BED_TYPES),
  bedTotal: z.coerce
    .number()
    .min(1, 'There should be at least one bed in a room'),
  totalRooms: z.coerce.number().min(1, 'Should be at least one'),
  baseRate: z.coerce
    .number()
    .nonnegative()
    .min(1, 'Rate should be greater than 0'),
  peopleInBaseRate: z.coerce.number().min(1, 'Should be at least  one'),
  pricingModel: z.enum(PRICING_MODEL_TYPE),
  roomImages: ImageObjectArraySchema.refine(
    data => data.length > 0,
    'Add at least one image',
  ),
});

export const completeRoomSchema = baseRoomSchema.merge(baseRoomAmenitiesSchema);
export const roomImagesSchema = cloudinaryImageSchema.extend({
  id: z.string(),
  roomId: z.string(),
});

export const roomImagesArraySchema = z
  .array(roomImagesSchema)
  .transform(arr => arr?.filter(Boolean));

export const availabilitySchema = z.object({
  date: z.coerce.date(),
  isAvailable: z.boolean(),
  inventory: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
});
export const getRoomSchema = baseRoomSchema.extend({
  id: z.string(),
  hotelId: z.string(),
  roomImages: z.array(roomImagesSchema),
  amenities: baseRoomAmenitiesSchema,
  roomAvailability: z.array(availabilitySchema),
});

export const updateHotelSchema = baseHotelSchema.partial().extend({
  slug: z.string().min(3, 'Slug must be at least 3 characters').optional(),
});

export const insertCountrySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Country name is required'),
  iso2: z.string().min(1, 'iso2 is required'),
  iso3: z.string().min(1, 'iso2 is required'),
  phoneCode: z.string().optional(),
  capital: z.string().optional(),
  currency: z.string().optional(),
  currency_name: z.string().optional(),
  region: z.string().optional(),
  nationality: z.string().optional(),
});

export const insertStateSchema = z.object({
  name: z.string().min(1, 'State name is required'),
  country_code: z.string().min(1, 'Country code is required'),
  country_name: z.string().min(1, 'Country code is required'),
  id: z.string().min(1, 'Id is required'),
  state_code: z.string().optional(),
});

export const insertCitySchema = z.object({
  name: z.string().min(1, 'City name is required'),
  id: z.string().min(1, 'Id is required'),
  state_code: z.string().optional(),
  state_name: z.string().optional(),
  state_id: z.string().min(1, 'State id is required'),
  country_name: z.string().optional(),
});

export const imageFileSchema = z.instanceof(File).superRefine((file, ctx) => {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: 'array',
      maximum: MAX_FILE_SIZE,
      inclusive: true,
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    });
  }

  // Validate file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `File must be one of ${ALLOWED_FILE_TYPES.join(', ')}`,
    });
  }
});

export const hotelImageUploadSchema = z.object({
  hotelImages: z.array(imageFileSchema).min(1, 'Select at least one image'),
  exterior: z.array(imageFileSchema).min(1, 'Select at least one image'),
  interior: z.array(imageFileSchema).min(1, 'Select at least one image'),
});

export const hotelSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  status: z.enum(HotelStatus),
  completionSteps: completionStepsSchema,
  currentStep: z.number(),
  totalSteps: z.number(),
  isFullyCompleted: z.boolean(),
  agentId: z.string().uuid(),
  basicInfo: basicInfoSchema,
  images: z.array(HotelImageSchema),
  policies: baseHotelPolicySchema,
  amenities: baseHotelAmenitiesSchema,
  rooms: z.array(getRoomSchema),
});
