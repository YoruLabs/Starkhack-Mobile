import { AppText } from '@components/text/AppText'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppColors } from '@utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignupScreen(): ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AppText>Signup</AppText>
      </View>
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
    marginHorizontal: 16,
    paddingTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
