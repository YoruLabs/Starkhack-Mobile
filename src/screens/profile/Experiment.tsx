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
import { RpcProvider, Contract, Account } from 'starknet' // Import hash from starknet.js
import { EnclaveSigner } from '@utils/p256Signer'
import {
  ACCOUNT_ADDRESS,
  ABI,
  ACCOUNT_NAME,
  HEX_MESSAGE,
  PROMPT_COPY,
  TEST_ADDRESS,
} from '@utils/SignerConstants'
import Header from '@components/Header'
import AppButton from '@components/AppButton'
import { Spacer } from '@components/Spacer'

export default function ExperimentScreen(): ReactElement {
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')

  // const provider = new RpcProvider(); // Sepolia
  const RPC_ENDPOINT = 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7'
  // 1. Connect to StarkNet
  const provider = new RpcProvider({
    nodeUrl: RPC_ENDPOINT,
  })
  async function handleCreateKeyPair(): Promise<void> {
    const publicKey = await createKeyPair(ACCOUNT_NAME)
    console.log('Public Key - ', publicKey)
    setMessage(`Public Key: ${publicKey}`)
  }

  async function handleFetchPublicKey(): Promise<void> {
    const publicKeyHex = await fetchPublicKey(ACCOUNT_NAME)
    console.log('Public Key (Hex) - ', publicKeyHex)
    const { x, y } = parsePublicKey(publicKeyHex ?? '')

    console.log('Public Key (x) - ', x)
    console.log('Public Key (y) - ', y)

    setMessage(`Public Key (x, y): (${x}, ${y})`)
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
  ): Promise<void> {
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

  async function createAndSignTransaction(): Promise<void> {
    try {
      let pvt_key = '0x100'

      const enclaveSigner = new EnclaveSigner(pvt_key)

      // Need to fetch Account from Database
      // 1. Create Account with EnclaveSigner
      const account = new Account(provider, ACCOUNT_ADDRESS, enclaveSigner)

      console.log('Account', account)

      // 2. Get public key from EnclaveSigner
      const publicKey = await enclaveSigner.getPubKey()
      console.log('publicKey: ', publicKey)

      // 3. Instantiate contract
      // Connect the new contract instance :
      const myTestContract = new Contract(ABI, TEST_ADDRESS, account)

      console.log('Account Nonce', await account.getNonce())

      // 4. Interaction with the contract read
      const count = await myTestContract.get_counter()
      console.log('Initial count =', count)

      // 5. Execute contract call
      // TODO: Get increase_counter working
      const res = await myTestContract.increase_counter()
      await provider.waitForTransaction(res.transaction_hash)

      const count2 = await myTestContract.get_counter()
      console.log('Final count =', count2)
    } catch (error) {
      console.error('Transaction error:', error)
    }
  }

  async function createAndSignTransaction2(): Promise<void> {
    try {
      const testAddress =
        '0x4946d0ed1ec6f1ed9aff9744473b84af9c28d1b8adff36e5a8c94df67631266'
      // const provider = new RpcProvider(); // Sepolia
      const privateKey = ''
      const accountAddress =
        '0x0498546e6e9d4bd039f53ef8c3813bdc5bc8b6c10efd270b407aa13e0f9f696d'

      const enclaveSigner = new EnclaveSigner(privateKey)

      const account = new Account(provider, accountAddress, enclaveSigner)

      const myTestContract = new Contract(ABI, testAddress, account)
      console.log(myTestContract)
      // Interaction with the contract with call
      const count = await myTestContract.get_counter()
      console.log('Initial count =', count)

      const res = await myTestContract.increase_counter()
      await provider.waitForTransaction(res.transaction_hash)

      const count2 = await myTestContract.get_counter()
      console.log('Initial count =', count2)
    } catch (error) {
      console.error('Transaction error:', error)
    }
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
        <AppButton
          label="Check Starknet Tx Signature2"
          onPress={createAndSignTransaction2}
        />
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
