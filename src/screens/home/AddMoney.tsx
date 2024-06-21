import AppButton from '@components/AppButton'
import { DismissKeyboardView } from '@components/DismissKeyboardView'
import DropdownPicker from '@components/DropdownPicker'
import Header from '@components/Header'
import { Spacer } from '@components/Spacer'
import { useToast } from '@components/Toast'
import { AppText } from '@components/text/AppText'
import { AppTextInput } from '@components/text/AppTextInput'
import { platformNames, platforms } from 'types/money'
import { currencies, currencyCodes } from 'types/transaction'
import { AppColors } from '@utils/Colors'
import Strings from '@utils/Strings'
import React, { ReactElement, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SegmentedPicker, {
  PickerColumn,
  PickerItem,
  PickerOptions,
} from 'react-native-segmented-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IonIcons from '@expo/vector-icons/Ionicons'
import ViewFiller from '@components/ViewFiller'

export default function AddMoneyScreen(): ReactElement {
  const [platform, setPlatform] = React.useState(platforms.Revolut)
  const [currency, setCurrency] = React.useState(currencies.USDT)
  const [openTimePicker, setOpenTimePicker] = useState(false)
  const [amount, setAmount] = React.useState('')
  const { addToast } = useToast()

  const platformDropdownList: PickerOptions = [
    {
      key: 'platform',
      items: Object.values(platforms).map((p) => {
        return { label: p.name, value: p.name }
      }),
    },
  ]

  function addMoneyPress(): void {
    addToast({
      message: Strings.COMING_SOON,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add Money" />
      <DismissKeyboardView style={styles.content}>
        <AppText size="small">Select Platform</AppText>
        <Spacer vertical={8} />
        <TouchableOpacity
          style={styles.platformDropdown}
          onPress={() => setOpenTimePicker(true)}>
          <AppText>{platform.name}</AppText>
          <ViewFiller />
          <IonIcons
            name={openTimePicker ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
        <Spacer vertical={16} />
        <AppText size="small">Amount</AppText>
        <Spacer vertical={8} />
        <View style={styles.amountContainer}>
          <DropdownPicker
            dropdownWidth={80}
            options={currencyCodes}
            defaultIndex={currencyCodes.indexOf(currency.code)}
            onToggle={(index) => {
              setCurrency(
                Object.values(currencies).find((c) => c.code === currencyCodes[index]) ??
                  currencies.BTC,
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
          <AppButton label="Add Money" onPress={addMoneyPress} />
        </View>
      </DismissKeyboardView>
      <SegmentedPicker
        visible={openTimePicker}
        options={platformDropdownList}
        onConfirm={(selections) => {
          setPlatform(
            Object.values(platforms).find((p) => p.name === selections.platform) ??
              platforms.Revolut,
          )
          setOpenTimePicker(false)
        }}
        onCancel={() => setOpenTimePicker(false)}
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
