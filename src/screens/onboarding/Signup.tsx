import { AppText } from '@components/text/AppText'
import React, { ReactElement, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  GoogleSignin,
  GoogleSigninButton,
  User,
} from '@react-native-google-signin/google-signin'
import { AppColors } from '@utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isEmpty } from '@utils/util'
import { Image } from 'expo-image'
import AppButton from '@components/AppButton'
import { Spacer } from '@components/Spacer'

export default function SignupScreen(): ReactElement {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

  useEffect(() => {
    GoogleSignin.configure()
  }, [])

  const [user, setUser] = useState<User>()

  const signIn = async (): Promise<void> => {
    try {
      GoogleSignin.hasPlayServices()
      const currentUser = await GoogleSignin.signIn()
      setUser(currentUser)
      console.log('UserInfo - ', user)
    } catch (e) {
      console.log('Error - ', e)
    }
  }

  const signOut = async (): Promise<void> => {
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
    setUser(undefined)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AppText>Sign In!</AppText>
        {!isEmpty(user) && (
          <View style={styles.userContainer}>
            <Image
              style={styles.image}
              source={user.user.photo}
              placeholder={{ blurhash: blurhash }}
              contentFit="contain"
              transition={1000}
            />
            <View style={styles.userDetails}>
              <AppText size="small">{user.user.name}</AppText>
              <AppText size="small">{user.user.email}</AppText>
            </View>
          </View>
        )}
        {isEmpty(user) && (
          <GoogleSigninButton
            style={styles.googleSignIn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
            disabled={false}
          />
        )}
        <Spacer vertical={32} />
        {!isEmpty(user) && <AppButton label="Sign out" onPress={signOut} />}
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
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 32,
    paddingHorizontal: 32,
  },
  userDetails: {
    paddingStart: 12,
  },
  image: {
    width: 44,
    height: 44,
    backgroundColor: '#0553',
  },
  googleSignIn: {
    height: 48,
    borderColor: AppColors.border,
    marginTop: 64,
  },
})
