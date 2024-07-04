import Header from '@components/Header'
import { AppColors } from '@utils/Colors'
import React, { ReactElement, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DismissKeyboardView } from '@components/DismissKeyboardView'
import { Spacer } from '@components/Spacer'
import { AppTextInput } from '@components/text/AppTextInput'
import { Currency, currenciesCrypto } from 'types/transaction'
import { useToast } from '@components/Toast'
import AppButton from '@components/AppButton'
import IonIcons from '@expo/vector-icons/Ionicons'
import { PressableOpacity } from 'react-native-pressable-opacity'
import { AppText } from '@components/text/AppText'
import { BORDER_RADIUS } from '@utils/constants/Constants'
import ViewFiller from '@components/ViewFiller'
import { useNavigation } from '@react-navigation/native'
import Strings from '@utils/Strings'
import { isEmpty } from '@utils/util'

export default function ExchangeScreen(): ReactElement {
  const currencyList = currenciesCrypto
  const [fromCurrency, setFromCurrency] = useState<Currency>(currencyList.BTC)
  const [fromAmount, setFromAmount] = useState('')
  const [toCurrency, setToCurrency] = useState<Currency>(currencyList.ETH)
  const [toAmount, setToAmount] = useState('')
  const [isFromDropdownVisible, setFromDropdownVisible] = useState(false)
  const [isToDropdownVisible, setToDropdownVisible] = useState(false)

  const mainNavigation = useNavigation()
  const { addToast } = useToast()

  function navigateToPreviewSwap(): void {
    addToast({
      message: Strings.COMING_SOON,
    })
  }

  function selectCurrency(type: 'from' | 'to', exludeCurrency?: Currency): void {
    type === 'from' ? setFromDropdownVisible(true) : setToDropdownVisible(true)
    mainNavigation.navigate('AccountListBT', {
      title: 'Select Account',
      showAmount: type === 'from' ? true : false,
      excludeCurrency: exludeCurrency,
      onCallback: function (currency) {
        if (!isEmpty(currency)) {
          type === 'from' ? setFromCurrency(currency) : setToCurrency(currency)
        }
        type === 'from' ? setFromDropdownVisible(false) : setToDropdownVisible(false)
      },
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Swap" backType="close" />
      <DismissKeyboardView style={styles.content}>
        <View style={styles.amountContainer}>
          <PressableOpacity
            style={styles.currencyContainer}
            onPress={() => selectCurrency('from')}>
            <AppText size="very-small">{fromCurrency.code}</AppText>
            <ViewFiller />
            <IonIcons
              name={isFromDropdownVisible ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#000"
            />
          </PressableOpacity>
          <Spacer horizontal={8} />
          <View style={{ flex: 1 }}>
            <AppTextInput
              value={fromAmount}
              onChangeText={setFromAmount}
              placeholderTextColor={AppColors.grey}
              placeholder="Amount"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              customTextStyles={{ fontWeight: 'bold' }}
            />
          </View>
        </View>

        <Spacer vertical={16} />
        <IonIcons name="arrow-down" size={32} style={{ alignSelf: 'center' }} />
        <Spacer vertical={16} />

        <View style={styles.amountContainer}>
          <PressableOpacity
            style={styles.currencyContainer}
            onPress={() => selectCurrency('to', fromCurrency)}>
            <AppText size="very-small">{toCurrency.code}</AppText>
            <ViewFiller />
            <IonIcons
              name={isToDropdownVisible ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#000"
            />
          </PressableOpacity>
          <Spacer horizontal={8} />
          <View style={{ flex: 1 }}>
            <AppTextInput
              value={toAmount}
              editable={false}
              customContainerStyles={{ backgroundColor: AppColors.greyBackgroundDark }}
              placeholderTextColor={AppColors.grey}
              placeholder="0"
              customTextStyles={{ fontWeight: 'bold' }}
            />
          </View>
        </View>

        <Spacer vertical={64} />
        <View>
          <AppButton label="Preview Swap" onPress={navigateToPreviewSwap} />
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.greyBackground,
  },
  content: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
