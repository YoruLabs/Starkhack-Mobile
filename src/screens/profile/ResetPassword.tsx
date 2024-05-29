import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScreenProps } from '../../navigation/Router'
import { AppText } from '@components/text/AppText'

export default function ResetPasswordScreen({
  navigation,
  route,
}: ScreenProps<'ResetPassword'>): ReactElement {
  // Access props like this
  const { email } = route.params

  return (
    <View style={styles.container}>
      <AppText>Reset Password</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
