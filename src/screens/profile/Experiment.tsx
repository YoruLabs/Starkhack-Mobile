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
import { HEX_MESSAGE, PROMPT_COPY, ERC20_ADDRESS } from '@utils/constants/SignerConstants'
import Header from '@components/Header'
import AppButton from '@components/AppButton'
import { Spacer } from '@components/Spacer'
import { derPublicKeyToXandY } from '@utils/crypto/utils'

import ERC20Manager from 'managers/ERC20Manager'
import { useAtomValue } from 'jotai'
import { Atoms } from '@state/Atoms'

export default function ExperimentScreen(): ReactElement {
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  let accountAddress = useAtomValue(Atoms.AccountAddress)

  let accountEmail = String(useAtomValue(Atoms.User)?.email)
  const erc20Manager = new ERC20Manager(accountAddress, ERC20_ADDRESS, accountEmail)

  async function handleCreateKeyPair(): Promise<void> {
    const publicKey = await createKeyPair(accountEmail)
    console.log('Public Key - ', publicKey)
    setMessage(`Public Key: ${publicKey}`)
  }

  async function handleFetchPublicKey(): Promise<void> {
    let accountEmail = 'danilowhk@gmail.com'
    console.log('accountEmail', accountEmail)
    const publicKeyHex = await fetchPublicKey(accountEmail)
    let [x, y] = derPublicKeyToXandY(publicKeyHex)
    setMessage(`Public Key Hex: ${publicKeyHex} x: ${x} y: ${y}`)
    console.log('Public Key Hex - ', publicKeyHex)
  }

  async function handleSign(): Promise<void> {
    const signature = await sign(accountEmail, HEX_MESSAGE, PROMPT_COPY)
    setSignature(signature)
  }

  async function handleVerify(): Promise<void> {
    const isValid = await verifySignature(accountEmail, signature, HEX_MESSAGE)
    console.log('Verification Result', isValid)
    setMessage(`Verification Result: ${isValid}`)
  }

  async function handleFetchBalance(): Promise<void> {
    console.log('Account', accountAddress)
    if (!accountAddress) {
      setMessage('Please deploy and initialize the account first.')
      return
    }
    const balance = await erc20Manager.balance(accountAddress)
    setMessage(`Balance: ${balance.balance}`)
  }

  async function handleMint(): Promise<void> {
    console.log('accountAddress', accountAddress)
    if (!accountAddress) {
      setMessage('Please deploy and initialize the account first.')
      return
    }
    const txHash = await erc20Manager.mint(accountAddress, 1000) // Mint 1000 tokens
    setMessage(`Minted 1000 tokens. Transaction hash: ${txHash}`)
  }

  async function handleApprove(): Promise<void> {
    if (!accountAddress) {
      setMessage('Please deploy and initialize the account first.')
      return
    }
    const txHash = await erc20Manager.approve(accountAddress, 100000) // Approve 100000 tokens
    setMessage(`Approved 100000 tokens. Transaction hash: ${txHash}`)
  }

  async function handleAllowance(): Promise<void> {
    if (!accountAddress) {
      setMessage('Please deploy and initialize the account first.')
      return
    }
    const tx = await erc20Manager.allowance(accountAddress, accountAddress) // Check allowance
    setMessage(`Allowance is: ${tx.allowance}`)
  }

  async function verifySignature(
    accountEmail: any,
    signature: any,
    HEX_MESSAGE: any,
  ): Promise<boolean> {
    return await verify(accountEmail, signature, HEX_MESSAGE)
  }

  async function handleSendTransaction(): Promise<void> {
    if (!accountAddress) {
      setMessage('Please deploy and initialize the account first.')
      return
    }

    const to = '0x01f7888e80ef310fc98d8e82b9e2f22cf962ee0342fe830aaabeaf1b0fc05bdf' // Specify the recipient's address

    try {
      const txHash = await erc20Manager.transfer(to, 100) // Mint 1000 tokens
      setMessage(`Transfered 100 tokens. Transaction hash: ${txHash}`)
    } catch (error) {
      console.error('Transaction error:', error)
      setMessage('Transaction failed. Please check the console for details.')
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

        <Spacer vertical={12} />
        <AppButton label="Fetch Balance" onPress={handleFetchBalance} />
        <Spacer vertical={12} />
        <AppButton label="Mint to Account" onPress={handleMint} />
        <Spacer vertical={12} />
        <AppButton label="Approve to Account" onPress={handleApprove} />
        <Spacer vertical={12} />
        <AppButton label="Allowance to Account" onPress={handleAllowance} />
        <Spacer vertical={12} />
        <AppButton label="Send Transaction1" onPress={handleSendTransaction} />
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
