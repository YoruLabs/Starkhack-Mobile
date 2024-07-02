import Header from '@components/Header'
import { AppColors } from '@utils/Colors'
import React, { ReactElement, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppTextInput } from '@components/text/AppTextInput'
import { Spacer } from '@components/Spacer'
import { AppText } from '@components/text/AppText'
import DropdownPicker from '@components/DropdownPicker'
import { Currency, currencies, currencyCodes } from 'types/transaction'
import AppButton from '@components/AppButton'
import { ScreenProps } from '@navigation/Router'
import { DismissKeyboardView } from '@components/DismissKeyboardView'
import { isEmpty } from '@utils/util'
import { useToast } from '@components/Toast'
import Strings from '@utils/Strings'

export default function SendScreen({ navigation }: ScreenProps<'Send'>): ReactElement {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const currencyList = currencies
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencyList.BTC)
  const { addToast } = useToast()

  function navigateToPreviewSend(): void {
    if (isEmpty(email)) {
      addToast({
        message: Strings.ENTER_EMAIL,
        type: 'error',
      })
      return
    }

    if (isEmpty(amount) || parseFloat(amount) <= 0) {
      addToast({
        message: Strings.ENTER_AMOUNT,
        type: 'error',
      })
      return
    }

    navigation.navigate('PreviewSend', {
      details: {
        recipientEmail: email,
        amount: parseFloat(amount),
        // @ts-ignore
        currency: selectedCurrency,
      },
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Send Money" backType="close" />
      <DismissKeyboardView style={styles.content}>
        <AppText size="small">Recepient email</AppText>
        <Spacer vertical={8} />
        <AppTextInput
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={AppColors.grey}
          placeholder="Enter email address..."
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Spacer vertical={16} />
        <AppText size="small">Amount</AppText>
        <Spacer vertical={8} />
        <View style={styles.amountContainer}>
          <DropdownPicker
            dropdownWidth={80}
            options={currencyCodes}
            onToggle={(index) => {
              setSelectedCurrency(
                Object.values(currencies).find(
                  (currency) => currency.code === currencyCodes[index],
                ) ?? currencies.BTC,
              )
            }}
          />
          <Spacer horizontal={8} />
          <View style={{ flex: 1 }}>
            <AppTextInput
              value={amount}
              onChangeText={setAmount}
              placeholderTextColor={AppColors.grey}
              placeholder="Amount"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              customTextStyles={{ fontWeight: 'bold' }}
            />
          </View>
        </View>

        <Spacer vertical={64} />
        <View style={styles.footer}>
          <AppButton label="Preview Send" onPress={navigateToPreviewSend} />
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
  footer: {
    zIndex: -1,
  },
})
