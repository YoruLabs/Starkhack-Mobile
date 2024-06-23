import { AppColors } from '@utils/Colors'
import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Transaction, transactions } from 'types/transaction'
import { AppText } from '@components/text/AppText'
import { Card } from '@components/Card'
import { EmptyList } from '@components/EmptyList'
import { getFormattedDate } from '@utils/DateTime'
import { Spacer } from '@components/Spacer'
import { AppImage } from '@components/AppImage'
import { useNavigation } from '@react-navigation/native'
import { useAtomValue } from 'jotai'
import { Atoms } from '@state/Atoms'
import { fetchPublicKey } from '../../../modules/expo-enclave'
import axios from 'axios'

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
        <AppImage source={transaction.toCurrency.symbol} />
      </View>
      <Spacer horizontal={12} />
      <View>
        <AppText size="small" type="bold">
          {transaction.mode === 'exchange'
            ? transaction.fromCurrency + ' -> ' + transaction.toCurrency
            : transaction.receiver.name}
        </AppText>
        <Spacer vertical={2} />
        <AppText size="very-small" color={AppColors.darkGrey}>
          {getFormattedDate(transaction.date)}
        </AppText>
      </View>
      <Spacer horizontal={12} />
      <View style={styles.amountContainer}>
        <AppText size="small" type="medium">
          {transaction.mode === 'exchange' ? '+' : '-'} {transaction.toCurrency.code}{' '}
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

  // TODO: Determine transaction type (send/receive) after backend is integrated

  return (
    <FlatList
      data={limit === undefined ? transactions : transactions.slice(0, limit)}
      nestedScrollEnabled={true}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => <ListItem transaction={item} />}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<EmptyList text="No Transactions" />}
    />
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
