import Header from '@components/Header'
import { AppColors } from '@utils/Colors'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '@components/text/AppText'
import { ScreenProps } from '@navigation/Router'
import { Spacer } from '@components/Spacer'
import { Card } from '@components/Card'
import ViewFiller from '@components/ViewFiller'
import { getFormattedDate } from '@utils/DateTime'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'

export default function TransactionDetailsScreen({
  route,
}: ScreenProps<'TransactionDetails'>): ReactElement {
  const { transaction } = route.params
  const date = new Date(transaction.date * 1000).getTime()

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Transaction Details" />
      <View style={styles.content}>
        <Card flexDirection="column">
          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              From
            </AppText>
            <ViewFiller />
            <AppText
              size="small"
              type="bold"
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ maxWidth: SCREEN_WIDTH * 0.7 }}>
              {transaction.sender.email}
            </AppText>
          </View>
          <Spacer vertical={12} />
          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              To
            </AppText>
            <ViewFiller />
            <AppText
              size="small"
              type="bold"
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ maxWidth: SCREEN_WIDTH * 0.7 }}>
              {transaction.receiver.email}
            </AppText>
          </View>
          <Spacer vertical={12} />
          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              Date
            </AppText>
            <ViewFiller />
            <AppText size="small">{getFormattedDate(new Date(date))}</AppText>
          </View>
        </Card>

        <Spacer vertical={16} />

        <Card flexDirection="column">
          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              Amount
            </AppText>
            <ViewFiller />
            <AppText
              size="small"
              type="medium"
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ maxWidth: SCREEN_WIDTH * 0.6 }}>
              {transaction.toCurrency?.code} {transaction.toAmount}
            </AppText>
          </View>

          <Spacer vertical={12} />

          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              Fees
            </AppText>
            <ViewFiller />
            <AppText size="small" type="medium">
              No fees
            </AppText>
          </View>

          <Spacer vertical={12} />

          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              Your total
            </AppText>
            <ViewFiller />
            <AppText
              size="small"
              type="medium"
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ maxWidth: SCREEN_WIDTH * 0.6 }}>
              {transaction.toCurrency?.code} {transaction.toAmount}
            </AppText>
          </View>
        </Card>
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
    paddingTop: 16,
    paddingHorizontal: 12,
  },
})
