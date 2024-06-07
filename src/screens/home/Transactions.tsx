import Header from '@components/Header'
import { useNavigation } from '@react-navigation/native'
import { AppColors } from '@utils/Colors'
import React, { ReactElement } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IonIcons from '@expo/vector-icons/Ionicons'
import { Transaction, transactions } from '@types/transaction'
import { AppText } from '@components/text/AppText'
import { Card } from '@components/Card'
import { EmptyList } from '@components/EmptyList'
import { getFormattedDate } from '@utils/DateTime'
import { Spacer } from '@components/Spacer'

export default function TransactionScreen(): ReactElement {
  const mainNavigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Transactions" />
      <View style={styles.content}>
        <FlatList
          data={transactions as Transaction[]}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.list}
          // View with a list of transactions - left icon, title, date, and right aligned amount and subamount
          renderItem={({ item }) => (
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
                  {item.type === 'exchange'
                    ? item.fromCurrency + ' -> ' + item.toCurrency
                    : item.receiverName}
                </AppText>
                <Spacer vertical={2} />
                <AppText size="very-small" color={AppColors.darkGrey}>
                  {getFormattedDate(item.date)}
                </AppText>
              </View>
              <Spacer horizontal={12} />
              <View style={styles.amountContainer}>
                <AppText size="small" type="medium">
                  {item.type === 'exchange' ? '+' : '-'} {item.toCurrencySymbol}
                  {item.toAmount}
                </AppText>
                <Spacer vertical={2} />
                <AppText size="very-small" color={AppColors.darkGrey}>
                  {item.type === 'exchange'
                    ? '- ' + item.fromCurrencySymbol + item.fromAmount
                    : ''}
                </AppText>
              </View>
            </Card>
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyList text="No Transactions" />}
        />
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
