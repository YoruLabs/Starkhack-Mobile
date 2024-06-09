import { AppText } from '@components/text/AppText'
import React, { ReactElement, useState } from 'react'
import { AppColors } from '@utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StyleSheet, View } from 'react-native'

import {
  fetchPublicKey,
  createKeyPair,
  sign,
  verify,
} from '../../../modules/expo-enclave'

import { ACCOUNT_NAME, HEX_MESSAGE, PROMPT_COPY } from '@utils/SignerConstants'
import Header from '@components/Header'
import AppButton from '@components/AppButton'
import { Spacer } from '@components/Spacer'
import { createAndSignTransaction } from '../../crypto_functions/sendTransaction'
import { derPublicKeyToXandY } from '@utils/crypto_utils'

export default function ExperimentScreen(): ReactElement {
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  async function handleCreateKeyPair(): Promise<void> {
    const publicKey = await createKeyPair(ACCOUNT_NAME)
    console.log('Public Key - ', publicKey)
    setMessage(`Public Key: ${publicKey}`)
  }

  async function handleFetchPublicKey(): Promise<void> {
    const publicKeyHex = await fetchPublicKey(ACCOUNT_NAME)
    let [x, y] = derPublicKeyToXandY(publicKeyHex)

    setMessage(`Public Key Hex: ${publicKeyHex} x: ${x} y: ${y}`)
  }

  async function handleSign(): Promise<void> {
    const signature = await sign(ACCOUNT_NAME, HEX_MESSAGE, PROMPT_COPY)
    setSignature(signature)
  }

  async function handleVerify(): Promise<void> {
    const isValid = await verifySignature(ACCOUNT_NAME, signature, HEX_MESSAGE)
    console.log('Verification Result', isValid)
    setMessage(`Verification Result: ${isValid}`)
  }

  // Verify the signature using the parsed r and s values
  async function verifySignature(
    ACCOUNT_NAME: any,
    signature: any,
    HEX_MESSAGE: any,
  ): Promise<boolean> {
    return await verify(ACCOUNT_NAME, signature, HEX_MESSAGE)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Experiment" />
      <View style={styles.content}>
        <AppButton label="Create Key Pair" onPress={handleCreateKeyPair} />
        <Spacer vertical={12} />
        <AppButton label="Fetch Public Key" onPress={handleFetchPublicKey} />
        <Spacer vertical={12} />
        <AppButton label="Sign Message" onPress={handleSign} />
        <Spacer vertical={12} />
        <AppButton label="Verify Signature" onPress={handleVerify} />
        <Spacer vertical={12} />
        <AppButton
          label="Check Starknet Tx Signature"
          onPress={createAndSignTransaction}
        />
        <Spacer vertical={12} />
        <Spacer vertical={12} />
        <AppText>{message}</AppText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
