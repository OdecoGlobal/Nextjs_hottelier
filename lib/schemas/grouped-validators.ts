import { z } from 'zod';
import {
  hotelBasicInfoSchema,
  baseHotelPolicySchema,
  baseHotelAmenitiesSchema,
} from './validator';

export const hotelBasicInfoStepOneSchema = hotelBasicInfoSchema.pick({
  name: true,
  hotelType: true,
  roomUnitTotal: true,
  acceptedCurrency: true,
});

export const hotelBasicInfoStepTwoSchema = hotelBasicInfoSchema.pick({
  address: true,
  city: true,
  state: true,
  country: true,
  zipCode: true,
});
export const hotelBasicInfoStepThreeSchema = hotelBasicInfoSchema.pick({
  lng: true,
  lat: true,
});

export const hotelPolicyStepOneSchema = baseHotelPolicySchema
  .pick({
    paymentMethods: true,
    isDepositRequired: true,
    depositAmount: true,
    isTaxIncludedInRoomRates: true,
    cancellationPolicy: true,
    cancellationFeeType: true,
    smokingPolicy: true,
    hasAdditionalPolicy: true,
    additionalPolicy: true,
  })
  .superRefine((data, ctx) => {
    if (
      data.isDepositRequired &&
      (data.depositAmount === undefined || data.depositAmount <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Deposit amount is required when you select yes',
        path: ['depositAmount'],
      });
    }

    if (
      data.cancellationPolicy === 'HOUR_24' ||
      data.cancellationPolicy === 'HOUR_48' ||
      (data.cancellationPolicy === 'HOUR_72' &&
        (data.cancellationFeeType === undefined || !data.cancellationFeeType))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Cancellation fee type is required',
        path: ['cancellationFeeType'],
      });
    }

    if (data.hasAdditionalPolicy) {
      if (!data.additionalPolicy || data.additionalPolicy.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Add at least one additional policy if you checked the box',
          path: ['additionalPolicy'],
        });
      } else {
        data.additionalPolicy.forEach((policy, index) => {
          if (!policy.value || policy.value.trim() === '') {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Policy cannot be empty',
              path: ['additionalPolicy', index, 'value'],
            });
          }
        });
      }
    }
  });

export const hotelPolicyStepTwoSchema = baseHotelPolicySchema
  .pick({
    isFrontDesk: true,
    isFrontDeskEveryDay: true,
    isFrontDeskOpen24Hours: true,
    frontDeskScheduleStartDay: true,
    frontDeskScheduleEndDay: true,
    frontDeskStartTime: true,
    frontDeskEndTime: true,
    isSelfCheckIn: true,
    selfCheckInType: true,

    checkInStartTime: true,
    checkInEndTime: true,
    isOpen24Hours: true,
    isLateCheckIn: true,
    lateCheckInType: true,
    surchargeType: true,
    surchargeAmount: true,

    lateCheckInStartTime: true,
    lateCheckInEndTime: true,
    isAdvancedNoticeCheckIn: true,
    advanceNoticeCheckInTime: true,

    checkOutTime: true,
    minCheckInAgeAllowed: true,
  })
  .superRefine((data, ctx) => {
    if (data.isFrontDesk) {
      if (
        !data.isFrontDeskOpen24Hours &&
        (data.frontDeskStartTime === '' ||
          data.frontDeskStartTime === undefined)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Set the time schedule of your frontdesk',
          path: ['frontDeskStartTime'],
        });
      }
      if (
        !data.isFrontDeskOpen24Hours &&
        (data.frontDeskEndTime === '' || data.frontDeskEndTime === undefined)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Set the time schedule of your frontdesk',
          path: ['frontDeskEndTime'],
        });
      }
      if (
        !data.isFrontDeskEveryDay &&
        data.frontDeskScheduleStartDay === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Set the day schedule of your frontdesk',
          path: ['frontDeskScheduleStartDay'],
        });
      }
      if (
        !data.isFrontDeskEveryDay &&
        data.frontDeskScheduleEndDay === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Set the day schedule of your frontdesk',
          path: ['frontDeskScheduleEndDay'],
        });
      }
    }
    if (data.isSelfCheckIn && data.selfCheckInType === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select a check in type',
        path: ['selfCheckInType'],
      });
    }
    if (!data.isOpen24Hours) {
      if (data.checkInEndTime === '' || data.checkInEndTime === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Select check-in end time if you are not opened 24 hours',
          path: ['checkInEndTime'],
        });
      }
      if (data.isLateCheckIn) {
        if (data.lateCheckInType === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'select an option',
            path: ['lateCheckInType'],
          });
        }
        if (data.lateCheckInType === 'SURCHARGE') {
          if (data.surchargeType === undefined) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'select an option',
              path: ['surchargeType'],
            });
          }
          if (
            data.surchargeType !== 'FEE_VARIES' &&
            (data.surchargeAmount === undefined || data.surchargeAmount <= 0)
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Input a valid amount',
              path: ['surchargeAmount'],
            });
          }
          if (
            data.lateCheckInStartTime === '' ||
            data.lateCheckInStartTime === undefined
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'select an option',
              path: ['lateCheckInStartTime'],
            });
          }
          if (
            data.lateCheckInEndTime === '' ||
            data.lateCheckInEndTime === undefined
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'select an option',
              path: ['lateCheckInEndTime'],
            });
          }
        }

        if (
          data.isAdvancedNoticeCheckIn &&
          (data.advanceNoticeCheckInTime === undefined ||
            data.advanceNoticeCheckInTime === '')
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Select an option',
            path: ['advanceNoticeCheckInTime'],
          });
        }
      }
    }
  });

export const hotelPolicyStepThreeSchema = baseHotelPolicySchema
  .pick({
    isPetAllowed: true,
    isPetSurcharged: true,
    petSurchargeAmount: true,
    petSurchargeType: true,
    petSurchargeDuration: true,
    isMaxFeePerStay: true,
    isPetFeeVaried: true,
    maxFeePerStayAmount: true,
    allowedPetType: true,
    isPetRestricted: true,
    petRestrictionType: true,
    isMaxWeightPerPet: true,
    petMaxWeight: true,
    isPetDeposit: true,
    petDepositType: true,
    petDepositAmount: true,
    isPetCleaningFee: true,
    petCleaningFee: true,
    petFriendlyFeatures: true,
  })
  .superRefine((data, ctx) => {
    if (data.isPetAllowed) {
      if (data.isPetSurcharged) {
        if (
          data.petSurchargeAmount === undefined ||
          data.petSurchargeAmount <= 0
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Set a valid amount',
            path: ['petSurchargeAmount'],
          });
        }
        if (data.petSurchargeType === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Select an option',
            path: ['petSurchargeType'],
          });
        }
        if (data.petSurchargeDuration === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Select an option',
            path: ['petSurchargeDuration'],
          });
        }
        if (
          data.isMaxFeePerStay &&
          (data.maxFeePerStayAmount === undefined ||
            data.maxFeePerStayAmount <= 0)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Set a valid amount',
            path: ['maxFeePerStayAmount'],
          });
        }
      }

      if (data.isPetDeposit) {
        if (data.petDepositAmount === undefined || data.petDepositAmount <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Set a valid amount',
            path: ['petDepositAmount'],
          });
        }
        if (data.petDepositType === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Select an option',
            path: ['petDepositType'],
          });
        }
      }
      if (
        data.isPetCleaningFee &&
        (data.petCleaningFee === undefined || data.petCleaningFee <= 0)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Set a valid amount',
          path: ['petCleaningFee'],
        });
      }
      if (
        data.isPetRestricted &&
        data.isMaxWeightPerPet &&
        (data.petMaxWeight === undefined || data.petMaxWeight <= 0)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Set a valid weight',
          path: ['petMaxWeight'],
        });
      }
    }
  });

export const completionStepsSchema = z.object({
  step4_rooms: z.boolean(),
  step5_rates: z.boolean(),
  step2_policies: z.boolean(),
  step6_amenities: z.boolean(),
  step1_basic_info: z.boolean(),
  step3_hotel_images: z.boolean(),
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

export const hotelItemSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  status: z.enum(['IN_PROGRESS']),
  completionSteps: completionStepsSchema,
  currentStep: z.number(),
  totalSteps: z.number(),
  isFullyCompleted: z.boolean(),
  ownerId: z.string().uuid(),
  basicInfo: basicInfoSchema,
});

export const hotelAmenitiesSchema = baseHotelAmenitiesSchema
  .transform(data => {
    if (!data.isWifi) {
      data.wifiArea = undefined;
      data.roomWifiChargeType = undefined;
      data.roomWifiSpeed = undefined;
      data.roomWifiSurchargeAmout = undefined;
      data.roomWifiSurchargeDuration = undefined;
      data.roomDeviceLimited = undefined;
      data.roomDeviceLimitNumber = undefined;
      data.publicWifiChargeType = undefined;
      data.publicWifiSpeed = undefined;
      data.publicWifiSurchargeAmout = undefined;
      data.publicWifiSurchargeDuration = undefined;
      data.publicDeviceLimited = undefined;
      data.publicDeviceLimitNumber = undefined;
    }

    if (!data.wifiArea?.includes('IN_GUEST_ROOM')) {
      data.roomWifiChargeType = undefined;
      data.roomWifiSpeed = undefined;
      data.roomWifiSurchargeAmout = undefined;
      data.roomWifiSurchargeDuration = undefined;
      data.roomDeviceLimited = undefined;
      data.roomDeviceLimitNumber = undefined;
    }
    if (!data.wifiArea?.includes('IN_PUBLIC_AREA')) {
      data.publicWifiChargeType = undefined;
      data.publicWifiSpeed = undefined;
      data.publicWifiSurchargeAmout = undefined;
      data.publicWifiSurchargeDuration = undefined;
      data.publicDeviceLimited = undefined;
      data.publicDeviceLimitNumber = undefined;
    }
    if (data.roomDeviceLimited === false) {
      data.roomDeviceLimitNumber = undefined;
    }
    if (data.publicDeviceLimited === false) {
      data.publicDeviceLimitNumber = undefined;
    }
    if (data.isBreakfast === false) {
      data.breakfastChargeType = undefined;
      data.breakfastSurchargeAmount = undefined;
      data.breakfastSchedule = undefined;
      data.breakfastStartTime = undefined;
      data.breakfastEndTime = undefined;
    }
    if (data.breakfastChargeType !== 'SURCHARGE') {
      data.breakfastSurchargeAmount = undefined;
    }

    return data;
  })
  .superRefine((data, ctx) => {
    if (data.isWifi) {
      if (data.wifiArea === undefined || data.wifiArea.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['wifiArea'],
          message: 'Select at least one option',
        });
      }
      if (data.wifiArea && data.wifiArea.length > 0) {
        if (data.wifiArea.includes('IN_GUEST_ROOM')) {
          if (
            data.roomWifiChargeType === undefined ||
            data.roomWifiChargeType === null
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['roomWifiChargeType'],
              message: 'Select your charge type',
            });
          }
          if (data.roomWifiChargeType === 'SURCHARGE') {
            if (
              data.roomWifiSurchargeAmout === undefined ||
              data.roomWifiSurchargeAmout <= 0
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['roomWifiSurchargeAmout'],
                message: 'Input a valid amount',
              });
            }

            if (
              data.roomWifiSurchargeDuration === null ||
              data.roomWifiSurchargeDuration === undefined
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['roomWifiSurchargeDuration'],
                message: 'Select a valid duration',
              });
            }
          }

          if (data.roomWifiSpeed === undefined || data.roomWifiSpeed === null) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['roomWifiSpeed'],
              message: 'Select the minimum wifi speed',
            });
          }
          if (
            data.roomDeviceLimited &&
            (data.roomDeviceLimitNumber === undefined ||
              data.roomDeviceLimitNumber === null ||
              data.roomDeviceLimitNumber <= 0)
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['roomDeviceLimitNumber'],
              message: 'Select a valid device limit',
            });
          }
        }
        if (data.wifiArea.includes('IN_PUBLIC_AREA')) {
          if (
            data.publicWifiChargeType === undefined ||
            data.publicWifiChargeType === null
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['publicWifiChargeType'],
              message: 'Select your charge type',
            });
          }
          if (data.publicWifiChargeType === 'SURCHARGE') {
            if (
              data.publicWifiSurchargeAmout === undefined ||
              data.publicWifiSurchargeAmout <= 0
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['publicWifiSurchargeAmout'],
                message: 'Input a valid amount',
              });
            }

            if (
              data.publicWifiSurchargeDuration === null ||
              data.publicWifiSurchargeDuration === undefined
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['publicWifiSurchargeDuration'],
                message: 'Select a valid duration',
              });
            }
          }

          if (
            data.publicWifiSpeed === undefined ||
            data.publicWifiSpeed === null
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['publicWifiSpeed'],
              message: 'Select the minimum wifi speed',
            });
          }
          if (
            data.publicDeviceLimited &&
            (data.publicDeviceLimitNumber === undefined ||
              data.publicDeviceLimitNumber === null ||
              data.publicDeviceLimitNumber <= 0)
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['publicDeviceLimitNumber'],
              message: 'Select a valid device limit',
            });
          }
        }
      }
    }
    if (data.isBreakfast) {
      if (
        data.breakfastChargeType === null ||
        data.breakfastChargeType === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Select a valid charge type',
          path: ['breakfastChargeType'],
        });
      }
      if (
        data.breakfastChargeType === 'SURCHARGE' &&
        (data.breakfastSurchargeAmount === undefined ||
          data.breakfastSurchargeAmount <= 0)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Input a valid amount',
          path: ['breakfastSurchargeAmount'],
        });
      }
      if (
        data.breakfastSchedule === undefined ||
        data.breakfastSchedule === null
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Select a valid schedule',
          path: ['breakfastChargeType'],
        });
      }
      if (
        data.breakfastStartTime === null ||
        data.breakfastStartTime === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Select an option',
          path: ['breakfastStartTime'],
        });
      }
      if (
        data.breakfastEndTime === null ||
        data.breakfastEndTime === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Select an option',
          path: ['breakfastEndTime'],
        });
      }
    }
  });

export const createHotelApiResponseSchema = z.object({
  status: z.enum(['success', 'error', 'fail']),
  data: z.object({
    hotel: hotelItemSchema.omit({ basicInfo: true }),
    basicInfoData: basicInfoSchema,
  }),
});
export const incompleteHotelApiResponseSchema = z.object({
  status: z.enum(['success', 'error', 'fail']),
  data: z.array(hotelItemSchema),
});
