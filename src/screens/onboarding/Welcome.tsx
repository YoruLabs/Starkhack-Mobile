import { LOGO_ICON } from '@assets/icons'
import AppButton from '@components/AppButton'
import { AppImage } from '@components/AppImage'
import { Spacer } from '@components/Spacer'
import { AppText } from '@components/text/AppText'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { AppColors } from '@utils/Colors'
import React, { ReactElement, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GoogleIcon from '@assets/icons/google'
import { Atoms, login } from '@state/Atoms'
import { useSetAtom } from 'jotai'
import { useNavigation } from '@react-navigation/native'
import Strings from '@utils/Strings'

export default function WelcomeScreen(): ReactElement {
  const loginUser = useSetAtom(login)
  const setAccountAddress = useSetAtom(Atoms.AccountAddress)

  const mainNavigation = useNavigation()

  useEffect(() => {
    GoogleSignin.configure()
  }, [])

  const signIn = async (): Promise<void> => {
    try {
      GoogleSignin.hasPlayServices()
      const currentUser = await GoogleSignin.signIn()
      console.log('UserInfo - ', currentUser)

      const token = currentUser.idToken ?? undefined
      const user = {
        id: currentUser.user.id,
        name: currentUser.user.name ?? undefined,
        email: currentUser.user.email,
        photo: currentUser.user.photo ?? undefined,
      }

      loginUser(user, token)

      updateAccountAddress()

      // Navigate to Home inside HomeStack
      mainNavigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
            params: {},
          },
        ],
      })
    } catch (e) {
      console.log('Error - ', e)
    }
  }

  function updateAccountAddress(): void {
    // TODO: Call backend function to get user account address
    // setAccountAddress(address)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Spacer vertical={100} />
        <AppImage source={LOGO_ICON} width={120} height={120} />
        <Spacer vertical={48} />
        <AppText size="extra-large" type="bold">
          {Strings.WELCOME}
        </AppText>
        <View style={styles.buttonContainer}>
          <AppButton
            label="Experiment"
            onPress={() =>
              mainNavigation.navigate('ProfileStack', { screen: 'Experiment' })
            }
            borderRadius={24}
            labelSize="normal"
          />
          <Spacer vertical={16} />
          <AppButton
            label={'Login with Strava'}
            onPress={() =>
              mainNavigation.navigate('OnboardingStack', { screen: 'RevolutWeb' })
            }
            backgroundColor={AppColors.black}
            borderRadius={24}
            labelSize="normal"
          />
          <Spacer vertical={16} />
          <AppButton
            label={Strings.SIGN_IN_WITH_GOOGLE}
            labelWeight="bold"
            labelSize="normal"
            leftIcon={<GoogleIcon />}
            backgroundColor={AppColors.black}
            borderRadius={24}
            labelColor={AppColors.white}
            onPress={signIn}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.greyBackground,
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 12,
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '92%',
    borderColor: AppColors.border,
  },
})
