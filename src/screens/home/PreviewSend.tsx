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
import { getAddress, sendTransaction } from 'requests/server_requests'
import ERC20Manager from 'managers/ERC20Manager'
import ZapEscrowManager from 'managers/ZapEscrowManager'

export default function PreviewSendScreen({
  navigation,
  route,
}: ScreenProps<'PreviewSend'>): ReactElement {
  const { details } = route.params
  const { addToast } = useToast()

  const [isLoading, setLoading] = useState(false)
  let accountAddress = useAtomValue(Atoms.AccountAddress)
  let accountEmail = String(useAtomValue(Atoms.User)?.email)

  async function onSendPress(): Promise<void> {
    // Get the recipient email, amount, and currency from the route params
    const { recipientEmail, amount, currency } = details

    console.log('Recipient Email:', recipientEmail)
    console.log('Token:', currency.code)
    console.log('Amount:', amount)

    // TODO: GET ERC20_ADDRESS based on "currency.code" or "currency.address"
    // let erc20address = currency.address

    const erc20Manager = new ERC20Manager(accountAddress, ERC20_ADDRESS, accountEmail)

    try {
      // TODO: Check if user used email, address or ens
      // TODO: On BACKEND RETURN ESCROW ADDRESS IF NOT an

      let response = await sendTransaction(recipientEmail)

      if (response.is_escrow == false) {
        setLoading(true)
        let to = response.blockchain_address

        const txHash = await erc20Manager.transfer(to, amount) // Mint 1000 tokens
        console.log('txHash', txHash)
      } else {
        setLoading(true)
        let escrow_address = response.blockchain_address
        const escrowManager = new ZapEscrowManager(
          accountAddress,
          escrow_address,
          accountEmail,
        )
        // TODO: Implement multicall
        // TODO: First check Allowance and approve only if needed
        const approveHash = await erc20Manager.approve(escrow_address, amount)
        console.log('approveHash', approveHash)
        // TODO: Get Token ID from currency
        const depositHash = await escrowManager.deposit(amount, 0)
        console.log('depositHash', depositHash)
      }

      setLoading(false)
      addToast({
        message: Strings.SEND_SUCCESS,
        type: 'success',
      })
      navigation.navigate('Home')
    } catch (error) {
      console.error('Transaction error:', error)
      setLoading(false)
    }
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
            {details.recipientEmail}
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
              {details.amount} {details.currency.code}
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
              {details.amount} {details.currency.code}
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
          <AppButton label="Send" isLoading={isLoading} onPress={onSendPress} />
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
