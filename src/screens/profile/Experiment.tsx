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
import { ACCOUNT_NAME, HEX_MESSAGE, PROMPT_COPY } from '@utils/crypto/SignerConstants'
import Header from '@components/Header'
import AppButton from '@components/AppButton'
import { Spacer } from '@components/Spacer'
import { derPublicKeyToXandY } from '@utils/crypto/crypto_utils'

// Import functions from zapAccount and erc20 modules
import { deployAndInitialize } from '@utils/crypto/zapAccount'
import { approve, getAllowance, getBalance, mint } from '@utils/crypto/erc20'

export default function ExperimentScreen(): ReactElement {
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  const [accountAddress, setAccountAddress] = useState(
    '0x15ed3e955161432ff55d43717e8c44c7ee4cce8dff91f10d1833969909e3d86',
  )

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

  async function handleDeployAndInitializeAccount(): Promise<void> {
    const publicKeyHex: any = await fetchPublicKey(ACCOUNT_NAME)

    const { address, deploymentTransactionHash } = await deployAndInitialize(publicKeyHex)
    setAccountAddress(address)
    setMessage(`Account deployed and initialized at address: ${address}`)
  }

  async function handleFetchBalance(): Promise<void> {
    console.log('Account', accountAddress)
    if (!accountAddress) {
      setMessage('Please deploy and initialize the account first.')
      return
    }
    const balance = await getBalance(accountAddress)
    setMessage(`Balance: ${balance.balance}`)
  }

  async function handleMint(): Promise<void> {
    if (!accountAddress) {
      setMessage('Please deploy and initialize the account first.')
      return
    }
    const txHash = await mint(accountAddress, 1000) // Mint 1000 tokens
    setMessage(`Minted 1000 tokens. Transaction hash: ${txHash}`)
  }

  async function handleApprove(): Promise<void> {
    if (!accountAddress) {
      setMessage('Please deploy and initialize the account first.')
      return
    }
    const txHash = await approve(accountAddress, 100000) // Mint 1000 tokens
    setMessage(`Minted 1000 tokens. Transaction hash: ${txHash}`)
  }

  async function handleAllowance(): Promise<void> {
    if (!accountAddress) {
      setMessage('Please deploy and initialize the account first.')
      return
    }
    const tx = await getAllowance(accountAddress, accountAddress) // Mint 1000 tokens
    setMessage(`Allowance is: ${tx.allowance}`)
  }

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
          label="Deploy and Initialize Account"
          onPress={handleDeployAndInitializeAccount}
        />
        <Spacer vertical={12} />
        <AppButton label="Fetch Balance" onPress={handleFetchBalance} />
        <Spacer vertical={12} />
        <AppButton label="Mint to Account" onPress={handleMint} />
        <Spacer vertical={12} />
        <AppButton label="Approve to Account" onPress={handleApprove} />
        <Spacer vertical={12} />
        <AppButton label="Allowance to Account" onPress={handleAllowance} />
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
