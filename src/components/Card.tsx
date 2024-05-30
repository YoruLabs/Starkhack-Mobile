import { AppColors } from '@utils/Colors'
import { BORDER_RADIUS } from '@utils/Constants'
import React, { ReactElement } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { PressableOpacity } from 'react-native-pressable-opacity'

type Props = {
  flexDirection?: 'row' | 'column'
  paddingHorizontal?: number
  paddingVertical?: number
  marginHorizontal?: number
  marginVertical?: number
  children: React.ReactNode
  customStyle?: ViewStyle
  onPress?: () => void
}

export function Card({
  flexDirection = 'row',
  paddingHorizontal = 16,
  paddingVertical = 16,
  marginHorizontal = 0,
  marginVertical = 0,
  children,
  customStyle,
  onPress,
}: Props): ReactElement {
  return onPress == null ? (
    <View
      style={{
        ...styles.card,
        flexDirection: flexDirection,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
        ...customStyle,
      }}>
      {children}
    </View>
  ) : (
    <PressableOpacity
      onPress={onPress}
      style={{
        ...styles.card,
        flexDirection: flexDirection,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
        ...customStyle,
      }}>
      {children}
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white,
    borderRadius: BORDER_RADIUS,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    elevation: 3,
  },
})
