import Header from '@components/Header'
import { AppText } from '@components/text/AppText'
import { AppColors } from '@utils/Colors'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen(): ReactElement {
  // const signOut = async (): Promise<void> => {
  //   await GoogleSignin.revokeAccess()
  //   await GoogleSignin.signOut()
  //   setUser(undefined)
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" />
      <View style={styles.content}>
        
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
    justifyContent: 'center',
  },
})
