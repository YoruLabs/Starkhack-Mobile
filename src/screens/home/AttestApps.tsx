import Header from '@components/Header'
import { AppColors } from '@utils/Colors'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TransactionList from '@screens/components/TransactionList'

export default function AttestAppsScreen(): ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Attest Apps" />
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
