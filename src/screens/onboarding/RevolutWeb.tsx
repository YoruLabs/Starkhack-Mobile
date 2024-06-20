import React, { ReactElement, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppColors } from '@utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenProps } from '@navigation/Router'
import Header from '@components/Header'
import AppButton from '@components/AppButton'
import { AppText } from '@components/text/AppText'
import * as RNWebBrowser from 'expo-web-browser'
import { Spacer } from '@components/Spacer'
import { REDIRECT_URI, STRAVA_AUTH_URL } from '@utils/Credentials'

type StravaResult = {
  type: 'success' | 'cancel'
  url: string
}

export default function RevolutWebScreen({
  navigation,
}: ScreenProps<'RevolutWeb'>): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [code, setCode] = useState('')

  const handleLogin = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const result = (await RNWebBrowser.openAuthSessionAsync(
      STRAVA_AUTH_URL,
      REDIRECT_URI,
    )) as StravaResult

    if (result.type === 'cancel') {
      console.log('Login canceled')
      return
    }

    const { url } = result
    // Extract authorization code
    const authCode = url.substring(
      url.indexOf('code=') + 5,
      url.indexOf('&', url.indexOf('code=')),
    )
    setIsLoggedIn(true)
    setCode(authCode)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Zap Web" onBackPress={navigation.goBack} />
      <View style={styles.content}>
        <AppButton label="Login with Strava" onPress={handleLogin} />
        <Spacer vertical={20} />
        {isLoggedIn && <AppText>Strava Auth code - {code}</AppText>}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
})
