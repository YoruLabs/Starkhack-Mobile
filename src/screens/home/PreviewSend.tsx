import Header from '@components/Header'
import { AppColors } from '@utils/Colors'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '@components/text/AppText'
import { ScreenProps } from '@navigation/Router'

export default function PreviewSendScreen({
  navigation,
  route,
}: ScreenProps<'PreviewSend'>): ReactElement {
  const { details } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Preview Send" />
      <View style={styles.content}>
        <AppText>{JSON.stringify(details)}</AppText>
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
