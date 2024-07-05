import { AppColors } from '@utils/Colors'
import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Transaction, currenciesCrypto, transactions } from 'types/transaction'
import { AppText } from '@components/text/AppText'
import { Card } from '@components/Card'
import { EmptyList } from '@components/EmptyList'
import { getFormattedDate } from '@utils/DateTime'
import { Spacer } from '@components/Spacer'
import { AppImage } from '@components/AppImage'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '@api/transaction'
import { useAtomValue } from 'jotai'
import { Atoms } from '@state/Atoms'
import { isEmpty } from '@utils/util'
import { fetchPublicKey } from '../../../modules/expo-enclave'
import { Loader } from '@components/Loader'

type TransactionProps = {
  transaction: Transaction
}

function ListItem({ transaction }: TransactionProps): JSX.Element {
  const mainNavigation = useNavigation()
  const navigateToTransactionDetails = (): void => {
    mainNavigation.navigate('HomeStack', {
      screen: 'TransactionDetails',
      params: {
        transaction: transaction,
      },
    })
  }

  return (
    <Card
      flexDirection="row"
      paddingHorizontal={14}
      paddingVertical={12}
      customStyle={styles.cardContainer}
      onPress={navigateToTransactionDetails}>
      <View style={styles.transactionImage}>
        <AppImage source={transaction?.toCurrency?.symbol} />
      </View>
      <Spacer horizontal={12} />
      <View>
        <AppText size="small" type="bold">
          {transaction.mode === 'exchange'
            ? transaction.fromCurrency?.code + ' -> ' + transaction?.toCurrency?.code
            : transaction.receiver.name}
        </AppText>
        <Spacer vertical={2} />
        <AppText size="very-small" color={AppColors.darkGrey}>
          {getFormattedDate(new Date(transaction.date))}
        </AppText>
      </View>
      <Spacer horizontal={12} />
      <View style={styles.amountContainer}>
        <AppText size="small" type="medium">
          {transaction.mode === 'exchange' ? '+' : '-'} {transaction?.toCurrency?.code}{' '}
          {transaction.toAmount}
        </AppText>
        <Spacer vertical={2} />
        <AppText size="very-small" color={AppColors.darkGrey}>
          {transaction.mode === 'exchange'
            ? '- ' + transaction.fromCurrency?.code + ' ' + transaction.fromAmount
            : ''}
        </AppText>
      </View>
    </Card>
  )
}

type TransactionListProps = {
  limit?: number
}

export default function TransactionList({ limit }: TransactionListProps): JSX.Element {
  const user = useAtomValue(Atoms.User)

  // const { data, isFetching } = useQuery({
  //   queryKey: ['transaction-list'],
  //   queryFn: async () => {
  //     const publicKeyHex = await fetchPublicKey(user?.email ?? '')
  //     return getTransactions(publicKeyHex ?? '')
  //   },
  //   enabled: !isEmpty(user),
  // })

  const data: Transaction[] = transactions
  const isFetching = false


  useEffect(() => {
    // TODO: Update this code later
    data?.map((transaction) => {
      transaction.date = new Date(transaction.date * 1000).getTime()
      transaction.toCurrency =
        Object.values(currenciesCrypto).find(
          (currency) => currency.address === transaction.tokenAddress,
        ) ?? currenciesCrypto.BTC

      console.log('🪐', 'Transaction', transaction)
    })
  }, [data])

  return (
    <>
      {isFetching ? <Loader /> : null}
      <FlatList
        data={data === undefined ? [] : limit === undefined ? data : data.slice(0, limit)}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ListItem transaction={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyList text="No Transactions" />}
      />
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  cardContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  transactionImage: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    position: 'absolute',
    right: 12,
    alignItems: 'flex-end',
  },
})
