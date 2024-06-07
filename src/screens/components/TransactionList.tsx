import { AppColors } from '@utils/Colors'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import IonIcons from '@expo/vector-icons/Ionicons'
import { Transaction, transactions } from '@types/transaction'
import { AppText } from '@components/text/AppText'
import { Card } from '@components/Card'
import { EmptyList } from '@components/EmptyList'
import { getFormattedDate } from '@utils/DateTime'
import { Spacer } from '@components/Spacer'
import { isEmpty } from '@utils/util'

type TransactionProps = {
  transaction: Transaction
}

function ListItem({ transaction }: TransactionProps): JSX.Element {
  return (
    <Card
      flexDirection="row"
      paddingHorizontal={14}
      paddingVertical={12}
      customStyle={styles.cardContainer}>
      <View style={styles.transactionImage}>
        <IonIcons
          // @ts-ignore
          name="briefcase"
          size={22}
          color={AppColors.white}
        />
      </View>
      <Spacer horizontal={12} />
      <View>
        <AppText size="small" type="bold">
          {transaction.type === 'exchange'
            ? transaction.fromCurrency + ' -> ' + transaction.toCurrency
            : transaction.receiverName}
        </AppText>
        <Spacer vertical={2} />
        <AppText size="very-small" color={AppColors.darkGrey}>
          {getFormattedDate(transaction.date)}
        </AppText>
      </View>
      <Spacer horizontal={12} />
      <View style={styles.amountContainer}>
        <AppText size="small" type="medium">
          {transaction.type === 'exchange' ? '+' : '-'} {transaction.toCurrencySymbol}
          {transaction.toAmount}
        </AppText>
        <Spacer vertical={2} />
        <AppText size="very-small" color={AppColors.darkGrey}>
          {transaction.type === 'exchange'
            ? '- ' + transaction.fromCurrencySymbol + transaction.fromAmount
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
    backgroundColor: AppColors.darkGrey,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    position: 'absolute',
    right: 12,
    alignItems: 'flex-end',
  },
})
