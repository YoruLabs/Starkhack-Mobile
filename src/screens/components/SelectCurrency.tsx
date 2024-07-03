import { AppColors } from '@utils/Colors'
import React from 'react'
import { StyleSheet } from 'react-native'
import { AppText } from '@components/text/AppText'
import { BORDER_RADIUS } from '@utils/constants/Constants'
import { PressableOpacity } from 'react-native-pressable-opacity'
import ViewFiller from '@components/ViewFiller'
import { CurrencyCode } from 'types/transaction'
import IonIcons from '@expo/vector-icons/Ionicons'

type Props = {
  currencyCode: CurrencyCode
  isDropdownVisible: boolean
  onPress: () => void
}

export default function SelectCurrency({
  currencyCode,
  isDropdownVisible,
  onPress,
}: Props): JSX.Element {
  return (
    <PressableOpacity style={styles.currencyContainer} onPress={onPress}>
      <AppText size="very-small">{currencyCode}</AppText>
      <ViewFiller />
      <IonIcons
        name={isDropdownVisible ? 'chevron-up' : 'chevron-down'}
        size={20}
        color="#000"
      />
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  currencyContainer: {
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: AppColors.border,
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    width: 80,
  },
})
