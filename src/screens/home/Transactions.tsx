import Header from '@components/Header'
import { AppColors } from '@utils/Colors'
import React, { ReactElement, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TransactionList from '@screens/components/TransactionList'
import { Transaction } from 'starknet-types-07'
import { useAtomValue } from 'jotai'
import { Atoms } from '@state/Atoms'
import { fetchPublicKey } from '../../../modules/expo-enclave'
import axios from 'axios'
import { Currency, CurrencyCode, currencies, currencyAddresses } from '../../types/transaction';


export default function TransactionScreen(): ReactElement {

  const token = useAtomValue(Atoms.AuthtokenApi);
  const user  = useAtomValue(Atoms.User);

  const [transactionsUser, setTransactionsUser] = useState<Transaction[]>([]);


  const getTransactions = async (): Promise<void> => {
    try{
      console.log('Getting transactions')
      const baseURL = 'http://localhost:4001'
      
      //const accountAddress = useAtomValue(Atoms.AccountAddress);

      console.log("user", user)

      const publicKeyHex = await fetchPublicKey(user?.email as string);

      console.log('Public Key', publicKeyHex);
      console.log('Token', token)

      const url = `${baseURL}/transactions/${publicKeyHex}`;

      const headers = {
        'Authorization': `Bearer ${token}`
      }

      const response = await axios.get(url, { headers });

      // [{"amount": 2000000, "from_address": "0x3595bdd2ca64cb16714b35c0f4e7a4e1a1d1498db0a5e7e65bae2573546b082", "id": 1, 
      // "receiver": {"email": "", "id": 1, "name": ""}, "sender": {"email": "", "id": 1, "name": ""}, "timestamp": 1719106508,
      //  "to_address": "0x3595bdd2ca64cb16714b35c0f4e7a4e1a1d1498db0a5e7e65bae2573546b082", 
      //  "token_address": "0x0592e877b1bd580c408849a29f0469ea8efa872f6accd2689048210ac5697a3f", "transaction_type": "transfer"}]

      // {
      //   id: '1',
      //   date: new Date('2022-01-01'),
      //   mode: 'send',
      //   toCurrency: currencies.BTC,
      //   sender: {
      //     id: '1',
      //     name: 'John Doe',
      //     email: 'john@gmail.com',
      //   },
      //   receiver: {
      //     id: '3',
      //     name: 'Mike Doe',
      //     email: 'mike@yahoo.com',
      //   },
      //   toAmount: 0.38,
      // },

      console.log('Response', response.data.transactions);

      console.log('Response', response.data.transactions[0]);

      console.log("currenty", currencyAddresses[String(response.data.transactions[0].token_address)]);
      console.log("token addr", response.data.transactions[0].token_address);
      //@ts-ignore
      const transactions: Transaction[] = response.data.transactions.map((transaction: any) => {
        console.log('Transaction', transaction)
        return {
          id: transaction.id,
          date: new Date(Number(transaction.timestamp) * 1000),
          mode: 'send',
          //@ts-ignore
          toCurrency: currencies[currencyAddresses[String(transaction.token_address)]],
          sender: {
            id: transaction.sender.id,
            name: transaction.sender.name,
            email: transaction.sender.email,
          },
          receiver: {
            id: transaction.receiver.id,
            name: transaction.receiver.name,
            email: transaction.receiver.email,
          },
          toAmount: transaction.amount,
        }
      });



      setTransactionsUser(transactions);


    } catch (error) {
      console.log('Error', error)
    }
  }


  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Transactions" />
      <View style={styles.content}>
        <TransactionList  transactionsUser={transactionsUser}  />
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
