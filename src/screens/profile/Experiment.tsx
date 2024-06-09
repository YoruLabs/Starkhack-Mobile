import { AppText } from '@components/text/AppText'
import React, { ReactElement, useState } from 'react'
import { AppColors } from '@utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StyleSheet, View } from 'react-native'
import { fromBER } from 'asn1js'

import {
  fetchPublicKey,
  createKeyPair,
  sign,
  verify,
} from '../../../modules/expo-enclave'
import { Buffer } from 'buffer'

import { ABI, ACCOUNT_NAME, HEX_MESSAGE, PROMPT_COPY } from '@utils/SignerConstants'
import Header from '@components/Header'
import AppButton from '@components/AppButton'
import { Spacer } from '@components/Spacer'
// import { createAndSignTransaction } from './sendTransaction'
import { Account, Contract, RpcProvider } from 'starknet'
import { createAndSignTransaction } from './sendTransaction'

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
    console.log('Public Key (Hex) - ', publicKeyHex)

    setMessage(`Public Key Hex: (${publicKeyHex}`)
  }

  async function handleSign(): Promise<void> {
    console.log('------------------- Starting Sign -------------------')
    const signature = await sign(ACCOUNT_NAME, HEX_MESSAGE, PROMPT_COPY)
    console.log('Signature (Hex) - ', signature)

    const { r, s } = parseSignature(signature)
    console.log('Signature (s) - ', s)
    console.log('Signature (r) - ', r)

    // Convert the hexadecimal message to Uint8Array
    const hexMessage = HEX_MESSAGE
    const messageBytes = hexMessage.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16))
    console.log('Message (Uint8Array) - ', new Uint8Array(messageBytes!))

    await handleFetchPublicKey()

    setSignature(signature)

    // setSignature(`Signature (r, s): (${r}, ${s})`);
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
    // Here we assume the ExpoEnclaveModule.verify function is correctly implemented and available
    return await verify(ACCOUNT_NAME, signature, HEX_MESSAGE)
  }

  // TODO: Fix this function to have the same result as "get_pubkey_point" from check_point.py
  function parsePublicKey(publicKeyHex: string): { x: bigint; y: bigint } {
    try {
      console.log('Starting parsePublicKey function')

      if (!publicKeyHex || typeof publicKeyHex !== 'string') {
        throw new Error('Invalid public key input')
      }

      const publicKeyBuffer = Buffer.from(publicKeyHex, 'hex')

      // Parse the DER-encoded public key
      const asn1Data = fromBER(publicKeyBuffer)
      const publicKeyInfo = asn1Data.result

      const publicKeyBits = publicKeyInfo.valueBlock.value[1]

      const xBytes = Buffer.from(
        publicKeyBits.valueBlock.valueHexView.slice(
          0,
          publicKeyBits.valueBlock.valueHexView.length / 2,
        ),
        'hex',
      )
      const yBytes = Buffer.from(
        publicKeyBits.valueBlock.valueHexView.slice(
          publicKeyBits.valueBlock.valueHexView.length / 2,
        ),
        'hex',
      )

      const xBigInt = BigInt(`0x${xBytes.toString('hex')}`)
      const yBigInt = BigInt(`0x${yBytes.toString('hex')}`)

      console.log('Public Key (x): ', xBigInt.toString())
      console.log('Public Key (y): ', yBigInt.toString())

      return { x: xBigInt, y: yBigInt }
    } catch (error) {
      console.error('Error in parsePublicKey function: ', error)
      throw error
    }
  }
  function parseSignature(signature): { r: bigint; s: bigint } {
    const signatureBuffer = Buffer.from(signature, 'hex')
    const signatureBytes = new Uint8Array(signatureBuffer)

    // Assume the signature is in the DER format (0x30 || length || 0x02 || r_length || r || 0x02 || s_length || s)
    const rLength = signatureBytes[3]
    const r = signatureBytes
      .slice(4, 4 + rLength)
      .reduce((acc, val) => (acc << 8n) + BigInt(val), 0n)

    const sLength = signatureBytes[4 + rLength + 1]
    const sStart = 4 + rLength + 2
    const sEnd = sStart + sLength
    const s = signatureBytes
      .slice(sStart, sEnd)
      .reduce((acc, val) => (acc << 8n) + BigInt(val), 0n)

    return { r, s }
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
