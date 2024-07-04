import AppButton from '@components/AppButton'
import { DismissKeyboardView } from '@components/DismissKeyboardView'
import Header from '@components/Header'
import { Spacer } from '@components/Spacer'
import { useToast } from '@components/Toast'
import { AppText } from '@components/text/AppText'
import { AppTextInput } from '@components/text/AppTextInput'
import { platforms } from 'types/money'
import { currenciesFiat } from 'types/transaction'
import { AppColors } from '@utils/Colors'
import Strings from '@utils/Strings'
import React, { ReactElement, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SegmentedPicker, { PickerOptions } from 'react-native-segmented-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IonIcons from '@expo/vector-icons/Ionicons'
import ViewFiller from '@components/ViewFiller'
import SelectCurrency from '@screens/components/SelectCurrency'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from '@utils/util'
import * as RNWebBrowser from 'expo-web-browser'
import { MONERIUM_AUTH_URL, MONERIUM_REDIRECT_URI } from '@utils/Credentials'
import { RedirectResult } from 'types/data-proof'

export default function AddMoneyScreen(): ReactElement {
  const [platform, setPlatform] = React.useState(platforms.Revolut)
  const [currency, setCurrency] = React.useState(currenciesFiat.EUR)
  const [openPlatformPicker, setOpenPlatformPicker] = useState(false)
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const [amount, setAmount] = React.useState('')
  const [authCode, setAuthCode] = useState('')

  const mainNavigation = useNavigation()
  const { addToast } = useToast()

  const platformDropdownList: PickerOptions = [
    {
      key: 'platform',
      items: Object.values(platforms).map((p) => {
        return { label: p.name, value: p.name }
      }),
    },
  ]

  function selectCurrency(): void {
    setDropdownVisible(true)
    mainNavigation.navigate('AccountListBT', {
      title: 'Select Currency',
      type: 'fiat',
      onCallback: function (selectedCurrency) {
        if (!isEmpty(selectedCurrency)) {
          setCurrency(selectedCurrency)
        }
        setDropdownVisible(false)
      },
    })
  }

  async function addMoneyPress(): Promise<void> {
    if (isEmpty(amount) || parseInt(amount, 10) <= 0) {
      addToast({
        message: Strings.ENTER_AMOUNT,
      })
      return
    }

    // Open web browser to get monerium auth code
    // Run python_scripts/redirection.py before clicking add money button
    const result = (await RNWebBrowser.openAuthSessionAsync(
      MONERIUM_AUTH_URL,
      MONERIUM_REDIRECT_URI,
    )) as RedirectResult

    console.log(result)

    if (result.type === 'cancel') return

    const { url } = result
    // Extract authorization code
    const code = url.substring(
      url.indexOf('code=') + 5,
      url.indexOf('&', url.indexOf('code=')),
    )
    setAuthCode(code)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add Money" backType="close" />
      <DismissKeyboardView style={styles.content}>
        {/* <AppText size="small">Select Platform</AppText>
        <Spacer vertical={8} />
        <TouchableOpacity
          style={styles.platformDropdown}
          onPress={() => setOpenPlatformPicker(true)}>
          <AppText>{platform.name}</AppText>
          <ViewFiller />
          <IonIcons
            name={openPlatformPicker ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
        <Spacer vertical={16} /> */}
        <AppText size="small">Amount</AppText>
        <Spacer vertical={8} />
        <View style={styles.amountContainer}>
          <SelectCurrency
            currencyCode={currency.code}
            isDropdownVisible={isDropdownVisible}
            onPress={() => selectCurrency()}
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

        <Spacer vertical={44} />
        <View style={styles.footer}>
          <AppButton label="Add Money" onPress={addMoneyPress} />
          <Spacer vertical={16} />
          {!isEmpty(authCode) && <AppText>Auth code - {authCode}</AppText>}
        </View>
      </DismissKeyboardView>
      <SegmentedPicker
        visible={openPlatformPicker}
        options={platformDropdownList}
        onConfirm={(selections) => {
          setPlatform(
            Object.values(platforms).find((p) => p.name === selections.platform) ??
              platforms.Revolut,
          )
          setOpenPlatformPicker(false)
        }}
        onCancel={() => setOpenPlatformPicker(false)}
        confirmText="Done"
        size={0.4}
      />
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
  platformDropdown: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: AppColors.white,
    height: 44,
  },
})
