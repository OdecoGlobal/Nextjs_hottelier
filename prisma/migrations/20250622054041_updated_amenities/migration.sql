-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'OWNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "SelfCheckInType" AS ENUM ('ACCESS_CODE', 'KEY_RETRIVAL_INSTRUCTION', 'LOCK_BOX', 'SMART_LOCK_CODE', 'EXPRESS_CHECKIN');

-- CreateEnum
CREATE TYPE "LateCheckInFeeType" AS ENUM ('FREE', 'SURCHARGE');

-- CreateEnum
CREATE TYPE "SurchargeType" AS ENUM ('AMOUNT', 'PERCENT', 'FEE_VARIES');

-- CreateEnum
CREATE TYPE "PetSurchargeType" AS ENUM ('PER_PET', 'PER_ACCOMODATION');

-- CreateEnum
CREATE TYPE "PetFeeDuration" AS ENUM ('PER_DAY', 'PER_NIGHT', 'PER_STAY', 'PER_WEEK');

-- CreateEnum
CREATE TYPE "AllowedPetType" AS ENUM ('ONLY_DOGS', 'ONLY_CATS', 'ONLY_DOGS_AND_CATS');

-- CreateEnum
CREATE TYPE "PetRestrictionType" AS ENUM ('ONLY_SMOKING_ROOMS', 'ONLY_SPECIFIC_AREAS', 'CANNOT_BE_LEFT_UNATTENDED', 'OTHERS');

-- CreateEnum
CREATE TYPE "PetFriendlyFeatures" AS ENUM ('FOOD_AND_WATER_BOWL', 'LITTER_BOX', 'DOG_EXERCISE_ROOM', 'PET_SITTING_SERVICES', 'PET_GROOMING_SERVICES');

-- CreateEnum
CREATE TYPE "BedType" AS ENUM ('SINGLE_OR_TWIN', 'LARGE_SINGLE_OR_LARGE_TWIN', 'DOUBLE', 'QUEEN', 'KING', 'WATER', 'BUNK');

-- CreateEnum
CREATE TYPE "PricingModelType" AS ENUM ('PER_DAY', 'OCCUPANCY_BASE');

-- CreateEnum
CREATE TYPE "BathroomType" AS ENUM ('PRIVATE', 'PARTIALLY_OPEN', 'SHARED');

-- CreateEnum
CREATE TYPE "ShowerType" AS ENUM ('BATHTUB', 'SEPARATE_BATHTUB_AND_SHOWER', 'SHOWER', 'BATHTUB_OR_SHOWER');

-- CreateEnum
CREATE TYPE "RoomEssentials" AS ENUM ('FREE_TOILETRIES', 'SOAP', 'SHAMPOO', 'TOILET_PAPER', 'HAIR_DRYER');

-- CreateEnum
CREATE TYPE "ClimateControlType" AS ENUM ('AIR_CONDITIONING', 'HEATING');

-- CreateEnum
CREATE TYPE "AirConditioningType" AS ENUM ('AIR_CONDITIONING', 'IN_ROOM_CLIMATE_CONTROL');

-- CreateEnum
CREATE TYPE "HeatingType" AS ENUM ('HEATING', 'IN_ROOM_CLIMATE_CONTROL');

-- CreateEnum
CREATE TYPE "RoomViewType" AS ENUM ('BAY', 'BEACH', 'DESERT', 'GOLF', 'CITY', 'GARDEN', 'CANAL', 'LAKE', 'OCEAN', 'PARK');

-- CreateEnum
CREATE TYPE "RoomSizeUnitType" AS ENUM ('SQUARE_FEET', 'SQUARE_METER');

-- CreateEnum
CREATE TYPE "OutDoorSpaceType" AS ENUM ('BALCONY', 'FURNISHED_BALCONY', 'BALCONY_OR_PATIO', 'FURNISHED_BALCONY_OR_PATIO', 'PATIO', 'FURNISHED_PATIO', 'DECK');

-- CreateEnum
CREATE TYPE "RoomLayoutType" AS ENUM ('DESK', 'SEPARATE_SITTING_AREA', 'LAPTOP_FRIENDLY_WORK_SPACE', 'PRIVATE_POOL');

-- CreateEnum
CREATE TYPE "HotelStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NGN', 'USD', 'EUR', 'GBP');

-- CreateEnum
CREATE TYPE "WifiAreaType" AS ENUM ('IN_PUBLIC_AREA', 'IN_GUEST_ROOM');

-- CreateEnum
CREATE TYPE "HotelAmenityChargeType" AS ENUM ('FREE', 'SURCHARGE');

-- CreateEnum
CREATE TYPE "WifiSpeedType" AS ENUM ('MBPS_25', 'MBPS_50', 'MBPS_100', 'MBPS_200');

-- CreateEnum
CREATE TYPE "WifiSurchargeDuration" AS ENUM ('PER_STAY', 'PER_HOUR', 'PER_NIGHT', 'PER_DAY', 'PER_WEEK');

-- CreateEnum
CREATE TYPE "BreakfastSchedule" AS ENUM ('DAILY', 'WEEKDAYS', 'WEEKENDS');

-- CreateEnum
CREATE TYPE "HotelType" AS ENUM ('HOTEL', 'MOTEL', 'GUESTHOUSE', 'INN', 'APARTMENT');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('COVER', 'EXTERIOR', 'INTERIOR');

-- CreateEnum
CREATE TYPE "HotelCategory" AS ENUM ('BUDGET', 'BUSINESS', 'LUXURY', 'RESORT', 'BOUTIQUE', 'EXTENDED_STAY');

-- CreateEnum
CREATE TYPE "CancellationPolicy" AS ENUM ('FREE_CANCELLATION', 'HOUR_24', 'HOUR_48', 'HOUR_72', 'NO_REFUND');

-- CreateEnum
CREATE TYPE "CancellationFeeType" AS ENUM ('FIRST_NIGHT_PLUS_TAX', 'AMOUNT_50', 'AMOUNT_100');

-- CreateEnum
CREATE TYPE "PetPolicy" AS ENUM ('NOT_ALLOWED', 'ALLOWED_WITH_FEE', 'ALLOWED_FREE');

-- CreateEnum
CREATE TYPE "SmokingPolicy" AS ENUM ('NO_SMOKING', 'SMOKING_ALLOWED', 'DESIGNATED_AREAS');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'CASH', 'BANK_TRANSFER', 'DIGITAL_WALLET');

-- CreateEnum
CREATE TYPE "RoomClass" AS ENUM ('BASIC', 'STANDARD', 'DELUXE', 'ECONOMY', 'FAMILY', 'EXECUTIVE', 'PRESIDENTIAL');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('DOUBLE_OR_TWIN', 'DOUBLE', 'SINGLE', 'TWIN', 'SUITE', 'STUDIO');

-- CreateEnum
CREATE TYPE "RateType" AS ENUM ('STANDARD', 'WEEKEND', 'SEASONAL', 'PROMOTIONAL', 'CORPORATE', 'GROUP');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userName" TEXT NOT NULL DEFAULT 'NO_NAME',
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(6),
    "image" TEXT,
    "password" TEXT,
    "passwordChangedAt" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "paymentMethod" "PaymentMethod",
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "status" "HotelStatus" NOT NULL DEFAULT 'DRAFT',
    "completionSteps" JSONB NOT NULL DEFAULT '{}',
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "totalSteps" INTEGER NOT NULL DEFAULT 6,
    "isFullyCompleted" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" UUID NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_basic_info" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "hotelType" "HotelType" NOT NULL,
    "roomUnitTotal" INTEGER NOT NULL DEFAULT 0,
    "acceptedCurrency" "Currency" NOT NULL DEFAULT 'NGN',
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "hotel_basic_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_policies" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "isFrontDesk" BOOLEAN NOT NULL DEFAULT false,
    "isFrontDeskEveryDay" BOOLEAN DEFAULT false,
    "isFrontDeskOpen24Hours" BOOLEAN DEFAULT false,
    "frontDeskScheduleStartDay" "Days",
    "frontDeskScheduleEndDay" "Days",
    "frontDeskStartTime" TEXT,
    "frontDeskEndTime" TEXT,
    "isSelfCheckIn" BOOLEAN NOT NULL,
    "selfCheckInType" "SelfCheckInType",
    "checkInStartTime" TEXT NOT NULL,
    "checkInEndTime" TEXT,
    "isOpen24Hours" BOOLEAN DEFAULT false,
    "isLateCheckIn" BOOLEAN DEFAULT false,
    "lateCheckInType" "LateCheckInFeeType",
    "surchargeType" "SurchargeType",
    "surchargeAmount" DECIMAL(65,30),
    "lateCheckInStartTime" TEXT,
    "lateCheckInEndTime" TEXT,
    "isAdvancedNoticeCheckIn" BOOLEAN DEFAULT false,
    "advanceNoticeCheckInTime" TEXT,
    "checkOutTime" TEXT NOT NULL,
    "minCheckInAgeAllowed" INTEGER NOT NULL,
    "isPetAllowed" BOOLEAN NOT NULL,
    "isPetSurcharged" BOOLEAN DEFAULT false,
    "petSurchargeAmount" DECIMAL(65,30),
    "petSurchargeType" "PetSurchargeType",
    "petSurchargeDuration" "PetFeeDuration",
    "isMaxFeePerStay" BOOLEAN DEFAULT false,
    "maxFeePerStayAmount" DECIMAL(65,30),
    "isPetFeeVaried" BOOLEAN DEFAULT false,
    "allowedPetType" "AllowedPetType",
    "isPetRestricted" BOOLEAN DEFAULT false,
    "petRestrictionType" "PetRestrictionType"[] DEFAULT ARRAY[]::"PetRestrictionType"[],
    "isMaxWeightPerPet" BOOLEAN DEFAULT false,
    "petMaxWeight" DECIMAL(65,30),
    "isPetDeposit" BOOLEAN,
    "petDepositType" "PetFeeDuration",
    "petDepositAmount" DECIMAL(65,30),
    "isPetCleaningFee" BOOLEAN DEFAULT false,
    "petCleaningFee" DECIMAL(65,30),
    "petFriendlyFeatures" "PetFriendlyFeatures"[] DEFAULT ARRAY[]::"PetFriendlyFeatures"[],
    "paymentMethods" "PaymentMethod"[],
    "isDepositRequired" BOOLEAN NOT NULL DEFAULT false,
    "depositAmount" DECIMAL(65,30),
    "cancellationPolicy" "CancellationPolicy" NOT NULL,
    "cancellationFeeType" "CancellationFeeType",
    "isTaxIncludedInRoomRates" BOOLEAN NOT NULL,
    "smokingPolicy" "SmokingPolicy" NOT NULL DEFAULT 'NO_SMOKING',
    "hasAdditionalPolicy" BOOLEAN NOT NULL DEFAULT false,
    "additionalPolicy" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "hotel_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_images" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "imageType" "ImageType" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "hotel_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_amenities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "isWifi" BOOLEAN NOT NULL,
    "wifiArea" "WifiAreaType"[],
    "roomWifiChargeType" "HotelAmenityChargeType",
    "roomWifiSpeed" "WifiSpeedType",
    "roomWifiSurchargeAmout" DECIMAL(65,30),
    "roomDeviceLimited" BOOLEAN,
    "roomWifiSurchargeDuration" "WifiSurchargeDuration",
    "roomDeviceLimitNumber" INTEGER,
    "publicWifiSurchargeAmout" DECIMAL(65,30),
    "publicWifiChargeType" "HotelAmenityChargeType",
    "publicWifiSpeed" "WifiSpeedType",
    "publicWifiSurchargeDuration" "WifiSurchargeDuration",
    "publicDeviceLimited" BOOLEAN,
    "publicDeviceLimitNumber" INTEGER,
    "isBreakfast" BOOLEAN NOT NULL,
    "breakfastChargeType" "HotelAmenityChargeType",
    "breakfastSurchargeAmount" DECIMAL(65,30),
    "breakfastSchedule" "BreakfastSchedule",
    "breakfastStartTime" TEXT,
    "breakfastEndTime" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "hotel_amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "roomType" "RoomType" NOT NULL,
    "roomClass" "RoomClass",
    "maxOccupancy" INTEGER NOT NULL,
    "bedType" "BedType" NOT NULL,
    "bedTotal" INTEGER NOT NULL DEFAULT 1,
    "totalRooms" INTEGER NOT NULL DEFAULT 1,
    "peopleInBaseRate" INTEGER NOT NULL DEFAULT 1,
    "baseRate" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "pricingModel" "PricingModelType" NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_amenities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roomId" UUID NOT NULL,
    "bathroomType" "BathroomType" NOT NULL,
    "bathroomNumber" DECIMAL(65,30) NOT NULL DEFAULT 1,
    "showerType" "ShowerType" NOT NULL,
    "roomEssential" "RoomEssentials"[],
    "isTowelProvided" BOOLEAN NOT NULL,
    "climateControl" "ClimateControlType"[] DEFAULT ARRAY[]::"ClimateControlType"[],
    "airConditionType" "AirConditioningType",
    "heatingType" "HeatingType",
    "isRoomView" BOOLEAN NOT NULL,
    "roomViewType" "RoomViewType",
    "roomSize" DECIMAL(65,30) NOT NULL,
    "roomSizeUnit" "RoomSizeUnitType" NOT NULL,
    "isOutDoorSpace" BOOLEAN NOT NULL,
    "outDoorSpaceType" "OutDoorSpaceType",
    "roomLayout" "RoomLayoutType"[] DEFAULT ARRAY[]::"RoomLayoutType"[],
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "room_amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_images" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roomId" UUID NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "room_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_availability" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roomId" UUID NOT NULL,
    "date" DATE NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "inventory" INTEGER,
    "price" DECIMAL(65,30),
    "currency" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "room_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "phoneCode" TEXT,
    "capital" TEXT,
    "currency" TEXT,
    "currencyName" TEXT,
    "region" TEXT,
    "nationality" TEXT,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,
    "stateCode" TEXT,
    "countryCode" TEXT,
    "countryName" TEXT,
    "countryId" UUID NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cityId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" UUID NOT NULL,
    "stateCode" TEXT,
    "stateName" TEXT,
    "stateUqId" INTEGER NOT NULL,
    "countryName" TEXT,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_basic_info_hotelId_key" ON "hotel_basic_info"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_name_idx" ON "hotel_basic_info"("name");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_slug_idx" ON "hotel_basic_info"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_policies_hotelId_key" ON "hotel_policies"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_amenities_hotelId_key" ON "hotel_amenities"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "room_name_idx" ON "rooms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_roomType_key" ON "rooms"("roomType");

-- CreateIndex
CREATE UNIQUE INDEX "room_availability_roomId_date_key" ON "room_availability"("roomId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "country_name_idx" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "country_iso2_idx" ON "Country"("iso2");

-- CreateIndex
CREATE UNIQUE INDEX "state_id_idx" ON "State"("stateId");

-- CreateIndex
CREATE UNIQUE INDEX "city_id_idx" ON "City"("cityId");

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_basic_info" ADD CONSTRAINT "hotel_basic_info_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_policies" ADD CONSTRAINT "hotel_policies_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_images" ADD CONSTRAINT "hotel_images_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_amenities" ADD CONSTRAINT "hotel_amenities_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_amenities" ADD CONSTRAINT "room_amenities_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_images" ADD CONSTRAINT "room_images_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_availability" ADD CONSTRAINT "room_availability_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
