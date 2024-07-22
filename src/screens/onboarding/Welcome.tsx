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
import { login } from '@state/Atoms'
import { useSetAtom } from 'jotai'
import { useNavigation } from '@react-navigation/native'
import Strings from '@utils/Strings'
import { createKeyPair, fetchPublicKey } from '../../../modules/expo-enclave'
import { useMutation } from '@tanstack/react-query'
import { authenticateUser } from '@api/user'
import { AuthArgs, User } from 'types/user'
import { isEmpty } from '@utils/util'
import { useToast } from '@components/Toast'
import { showError } from '@utils/ErrorUtil'
import { verifyBiometric } from '@utils/Biometrics'
import * as RNWebBrowser from 'expo-web-browser'
import { RedirectResult } from 'types/data-proof'

export default function WelcomeScreen(): ReactElement {
  const { addToast } = useToast()

  const mainNavigation = useNavigation()

  const loginUser = useSetAtom(login)
  const { mutate: mutateAuth, isPending } = useMutation({
    mutationKey: ['authenticateUser'],
    mutationFn: authenticateUser,
  })

  useEffect(() => {
    GoogleSignin.configure()
  }, [])

  const signIn = async (): Promise<void> => {
    // Sign In with google
    const googleAuthResponse = await googleSignIn()
    if (googleAuthResponse == null) return
    const { googleAuthToken, user } = googleAuthResponse

    // Get public key
    const publicKeyHex = await getPublicKey(user.email)
    console.log('🪐', 'publicKeyHex', publicKeyHex)

    // Authenticate user
    const authArgs: AuthArgs = {
      name: user.name ?? '',
      email: user.email,
      publicKeyHex: publicKeyHex,
      googleAuthToken: googleAuthToken,
    }

    const isAutheticated = await verifyBiometric()
    if (!isAutheticated) {
      showError({ message: Strings.USER_VERIFICATION_FAILED })
      return
    }
    console.log('🪐', 'Authenticating user', authArgs)

    mutateAuth(authArgs, {
      onSuccess: (data) => {
        console.log('🪐', 'Auth Success', data)
        loginUser(user, googleAuthToken, data.token, data.blockchain_address)
        navigateToHome()
      },
      onError: (error) => {
        showError(error, Strings.ERROR_SOMETHING_WENT_WRONG)
        console.log('Error authenticating user:', error.message)
      },
    })
  }

  function navigateToHome(): void {
    // Navigate to Home and reset stack
    mainNavigation.reset({
      index: 0,
      routes: [
        {
          name: 'HomeStack',
          params: {},
        },
      ],
    })
  }

  async function googleSignIn(): Promise<{
    googleAuthToken: string
    user: User
  } | null> {
    // Check for play services
    GoogleSignin.hasPlayServices()

    // Sign In with Google and get access token
    const response = await GoogleSignin.signIn()
    const tokenResponse = await GoogleSignin.getTokens()
    if (isEmpty(response.idToken) || isEmpty(tokenResponse.accessToken)) {
      addToast({
        message: Strings.SIGN_IN_WITH_GOOGLE_ERROR,
        type: 'error',
      })
      return null
    }

    // Set user info
    const user = {
      id: response.user.id,
      name: response.user.name ?? undefined,
      email: response.user.email,
      photo: response.user.photo ?? undefined,
    }

    // Return as auth response
    return {
      googleAuthToken: tokenResponse.accessToken,
      user: user,
    }
  }

  async function getPublicKey(email: string): Promise<string> {
    try {
      return await createKeyPair(email)
    } catch (error) {
      return (await fetchPublicKey(email)) ?? ''
    }
  }

  const handleCreateWallet = async (): Promise<void> => {
    const result = (await RNWebBrowser.openAuthSessionAsync(
      'https://zap-web-demo.vercel.app/create-wallet',
      'zap-mobile://wallet',
    )) as RedirectResult

    if (result.type === 'cancel') return

    const { url } = result
    addToast({
      message: 'Wallet imported successfully',
    })
    console.log(url)
  }

  const handleImportWallet = async (): Promise<void> => {
    const result = (await RNWebBrowser.openAuthSessionAsync(
      'https://zap-web-demo.vercel.app/import-wallet',
      'zap-mobile://wallet',
    )) as RedirectResult

    if (result.type === 'cancel') return

    const { url } = result
    addToast({
      message: 'Wallet imported successfully',
    })
    console.log(url)
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
            label="Create Wallet"
            labelWeight="bold"
            labelSize="normal"
            backgroundColor={AppColors.black}
            borderRadius={24}
            labelColor={AppColors.white}
            onPress={handleCreateWallet}
          />
          <Spacer vertical={16} />
          <AppButton
            label="Import Wallet"
            labelWeight="bold"
            labelSize="normal"
            backgroundColor={AppColors.black}
            borderRadius={24}
            labelColor={AppColors.white}
            onPress={handleImportWallet}
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
            isLoading={isPending}
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
