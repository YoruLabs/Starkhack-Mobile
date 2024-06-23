import Header from '@components/Header'
import { AppColors } from '@utils/Colors'
import React, { ReactElement, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TransactionList from '@screens/components/TransactionList'
import { Transaction } from 'starknet-types-07'
import { useAtomValue } from 'jotai'
import { Atoms } from '@state/Atoms'
import { fetchPublicKey } from '../../../modules/expo-enclave'
import axios from 'axios'


export default function TransactionScreen(): ReactElement {

  const token = useAtomValue(Atoms.AuthtokenApi);
  const user  = useAtomValue(Atoms.User);
  const getTransactions = async (): Promise<void> => {
    try{
      console.log('Getting transactions')
      const baseURL = 'http://localhost:4001'
      
      
      //const accountAddress = useAtomValue(Atoms.AccountAddress);

      const publicKeyHex = await fetchPublicKey(user?.email as string);

      console.log('Public Key', publicKeyHex);
      console.log('Token', token)

      const url = `${baseURL}/transactions/${publicKeyHex}`;

      const headers = {
        'Authorization': `Bearer ${token}`
      }

      const response = await axios.get(url, { headers });

      console.log('Response', response.data);

    } catch (error) {
      console.log('Error', error)
    }
  }


  useEffect(() => {
    getTransactions();
  });
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Transactions" />
      <View style={styles.content}>
        <TransactionList />
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
    paddingTop: 12,
  },
})
