import Header from '@components/Header'
import { AppColors } from '@utils/Colors'
import React, { ReactElement, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '@components/text/AppText'
import { ScreenProps } from '@navigation/Router'
import AppButton from '@components/AppButton'
import { useToast } from '@components/Toast'
import Strings from '@utils/Strings'
import { Spacer } from '@components/Spacer'
import { Card } from '@components/Card'
import ViewFiller from '@components/ViewFiller'
import { ERC20_ADDRESS } from '@utils/constants/SignerConstants'
import { useAtomValue } from 'jotai'
import { Atoms } from '@state/Atoms'
import ERC20Manager from 'managers/ERC20Manager'
import { useMutation } from '@tanstack/react-query'
import { getAddress } from '@api/user'
import { showError } from '@utils/ErrorUtil'

export default function PreviewSendScreen({
  navigation,
  route,
}: ScreenProps<'PreviewSend'>): ReactElement {
  const { recipientEmail, amount, currency } = route.params.details

  const accountAddress = useAtomValue(Atoms.AccountAddress)
  const accountEmail = String(useAtomValue(Atoms.User)?.email)

  const [isLoading, setLoading] = useState(false)

  const erc20Manager = new ERC20Manager(accountAddress, ERC20_ADDRESS, accountEmail)

  const { mutate: mutateAddress, isPending } = useMutation({
    mutationKey: ['getAddress'],
    mutationFn: getAddress,
  })

  const { addToast } = useToast()

  function onSendPress(): void {
    // TODO: GET ERC20_ADDRESS based on "currency.code" or "currency.address"
    // let erc20address = currency.address
    mutateAddress(recipientEmail, {
      onSuccess: (data) => {
        transferAmount(data.blockchain_address)
        console.log('data', data)
      },
      onError: (error) => {
        console.log('error', error)
      },
    })
  }

  async function transferAmount(toAddress: string): Promise<void> {
    setLoading(true)
    try {
      await erc20Manager.transfer(toAddress, amount) // Mint 1000 tokens
      addToast({
        message: Strings.SEND_SUCCESS,
        type: 'success',
      })
      navigation.navigate('Home')
    } catch (error) {
      showError(
        { message: Strings.TRANSACTION_FAILED },
        Strings.ERROR_SOMETHING_WENT_WRONG,
      )
    }
    setLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Preview Send" />
      <View style={styles.content}>
        <Card>
          <AppText size="small" type="medium" color={AppColors.darkGrey}>
            To
          </AppText>
          <ViewFiller />
          <AppText size="small" type="bold">
            {recipientEmail}
          </AppText>
        </Card>

        <Spacer vertical={16} />

        <Card flexDirection="column">
          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              Recipient gets
            </AppText>
            <ViewFiller />
            <AppText size="small" type="medium">
              {amount} {currency.code}
            </AppText>
          </View>

          <Spacer vertical={12} />

          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              Fees
            </AppText>
            <ViewFiller />
            <AppText size="small" type="medium">
              No fees
            </AppText>
          </View>

          <Spacer vertical={12} />

          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              Your total
            </AppText>
            <ViewFiller />
            <AppText size="small" type="medium">
              {amount} {currency.code}
            </AppText>
          </View>
        </Card>

        <Spacer vertical={16} />

        <Card>
          <AppText size="small" type="medium" color={AppColors.darkGrey}>
            Estimated arrival
          </AppText>
          <ViewFiller />
          <AppText size="small">Usually in seconds</AppText>
        </Card>

        <View style={styles.buttonContainer}>
          <AppButton
            label="Send"
            isLoading={isLoading || isPending}
            onPress={onSendPress}
          />
        </View>
      </View>
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
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 16,
    alignSelf: 'center',
  },
})
