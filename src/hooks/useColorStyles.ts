import { useMemo } from 'react'

import { AppColors } from '@utils/Colors'

import type { TextStyle, ViewStyle } from 'react-native'

type ToastStyles = {
  error: Pick<ViewStyle, 'backgroundColor'>
  success: Pick<ViewStyle, 'backgroundColor'>
  default: Pick<ViewStyle, 'backgroundColor'>
}

type InputStyles = {
  error: Pick<TextStyle, 'borderColor' | 'color'>
  success: Pick<TextStyle, 'borderColor' | 'color'>
  default: Pick<TextStyle, 'borderColor' | 'color'>
}

export type InputStyleTypes = keyof InputStyles
export type ToastTypes = keyof ToastStyles
interface ColorStyles {
  background: Pick<ViewStyle, 'backgroundColor'>
  container: Pick<ViewStyle, 'backgroundColor'>
  foreground: Pick<TextStyle, 'color'>
  toast: ToastStyles
  inputStyles: InputStyles
}

export function useColorStyles(): ColorStyles {
  return useMemo(
    () => ({
      background: {
        backgroundColor: AppColors.primary,
      },
      container: {
        backgroundColor: AppColors.secondary,
      },
      foreground: {
        color: AppColors.primary,
      },
      toast: {
        error: {
          backgroundColor: AppColors.negative,
        },
        success: {
          backgroundColor: AppColors.positive,
        },
        default: {
          backgroundColor: AppColors.grey,
        },
      },
      inputStyles: {
        error: {
          borderColor: AppColors.negative,
          color: AppColors.negative,
        },
        success: {
          borderColor: AppColors.positive,
          color: AppColors.positive,
        },
        default: {
          borderColor: AppColors.border,
          color: AppColors.black,
        },
      },
    }),
    [],
  )
}
