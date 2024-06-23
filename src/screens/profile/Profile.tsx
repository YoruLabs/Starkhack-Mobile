import AppButton from '@components/AppButton'
import { AppImage } from '@components/AppImage'
import Header from '@components/Header'
import { Spacer } from '@components/Spacer'
import { AppText } from '@components/text/AppText'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/native'
import { Atoms, logout } from '@state/Atoms'
import { AppColors } from '@utils/Colors'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen(): ReactElement {
  const mainNavigation = useNavigation()

  const user = useAtomValue(Atoms.User)
  const logoutUser = useSetAtom(logout)

  const signOut = async (): Promise<void> => {
    try{
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      logoutUser()
    } catch (error) {
      console.log('Error', error)
    } finally{
      // Navigate to welcome screen and clear stack
      mainNavigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingStack' }],
      })
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" />
      <View style={styles.content}>
        <View style={styles.userContainer}>
          <AppImage source={user?.photo} />
          <View style={styles.userDetails}>
            <AppText size="small">{user?.name}</AppText>
            <Spacer vertical={2} />
            <AppText size="very-small" color={AppColors.darkGrey}>
              {user?.email}
            </AppText>
          </View>
        </View>
        <Spacer vertical={24} />
        <AppButton label="Sign Out" onPress={signOut} />
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
    marginHorizontal: 16,
    paddingTop: 12,
    alignItems: 'center',
  },
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  userDetails: {
    paddingStart: 12,
  },
})
