import { AppColors } from '@utils/Colors'
import { BORDER_RADIUS } from '@utils/constants/Constants'
import React, { ReactElement, ReactNode, useCallback, useMemo } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { PressableScale } from 'react-native-pressable-scale'
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutDown,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated'
import { useStyle } from 'react-native-style-utilities'
import { AppText } from './text/AppText'
import * as Progress from 'react-native-progress'
import type { HapticFeedbackTypes } from 'react-native-haptic-feedback'
import { hapticFeedback } from '@utils/HapticFeedback'
import type { FontVariant, TextSize } from './text/Text'
import ViewFiller from './ViewFiller'

type Props = {
  backgroundColor?: string
  borderRadius?: number
  label: string
  labelColor?: string
  labelWeight?: FontVariant
  labelSize?: TextSize
  customStyles?: ViewStyle
  onPress: () => void
  disabled?: boolean
  isLoading?: boolean
  withAnimation?: boolean
  feedbackType?: HapticFeedbackTypes
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export default function AppButton({
  backgroundColor,
  borderRadius = BORDER_RADIUS,
  label,
  labelColor,
  labelWeight = 'bold',
  labelSize = 'small',
  customStyles,
  onPress,
  isLoading,
  disabled,
  withAnimation = false,
  feedbackType,
  leftIcon,
  rightIcon,
}: Props): ReactElement {
  const buttonColors = useMemo(
    () => ({
      labelColor: labelColor ?? AppColors.white,
      backgroundColor: backgroundColor ?? AppColors.primary,
    }),
    [backgroundColor, labelColor],
  )

  const buttonStyles = useStyle(
    () => [
      styles.buttonStyle,
      customStyles,
      {
        backgroundColor: buttonColors.backgroundColor,
        borderRadius: borderRadius,
        opacity: disabled || isLoading ? 0.5 : 1,
      },
    ],
    [borderRadius, customStyles, disabled, isLoading, buttonColors],
  )

  const onPressWithHapticFeedback = useCallback(() => {
    hapticFeedback(feedbackType)
    onPress()
  }, [feedbackType, onPress])

  return (
    <Animated.View
      exiting={FadeOutDown.duration(withAnimation ? 300 : 1)}
      entering={FadeInDown.duration(withAnimation ? 300 : 1)}
      style={styles.buttonStyle}>
      <PressableScale
        onPress={feedbackType != null ? onPressWithHapticFeedback : onPress}
        disabled={disabled || isLoading}
        style={buttonStyles}>
        <Animated.View
          layout={Layout.mass(0).stiffness(500).damping(400)}
          style={styles.buttonContent}>
          {leftIcon}
          <AppText color={buttonColors.labelColor} type={labelWeight} size={labelSize}>
            {label}
          </AppText>
          {isLoading && (
            <Animated.View exiting={FadeOutRight} entering={FadeInRight}>
              <Progress.Circle
                size={16}
                indeterminate={true}
                borderWidth={2}
                color={buttonColors.labelColor}
                style={{ marginLeft: 8 }}
              />
            </Animated.View>
          )}
          {rightIcon !== undefined && (
            <>
              <ViewFiller />
              <View style={styles.rightIcon}>{rightIcon}</View>
            </>
          )}
        </Animated.View>
      </PressableScale>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 42,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  rightIcon: {
    marginRight: 12,
  },
})
