import React, { ReactElement, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppColors } from '@utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenProps } from '@navigation/Router'
import Header from '@components/Header'

export default function RevolutWebScreen({
  navigation,
}: ScreenProps<'RevolutWeb'>): ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Zap Web" onBackPress={navigation.goBack} />
      <View style={styles.content}></View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
})
