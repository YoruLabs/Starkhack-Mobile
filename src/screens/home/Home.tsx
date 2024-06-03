import { AppImage } from '@components/AppImage'
import Header from '@components/Header'
import { AppText } from '@components/text/AppText'
import { useNavigation } from '@react-navigation/native'
import { Atoms } from '@state/Atoms'
import { AppColors } from '@utils/Colors'
import { useAtomValue } from 'jotai'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen(): ReactElement {
  const user = useAtomValue(Atoms.User)
  const mainNavigation = useNavigation()

  function navigateToProfile(): void {
    mainNavigation.navigate('ProfileStack', {
      screen: 'Profile',
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Zap"
        headerRight={
          <AppImage
            source={user?.photo}
            borderRadius={18}
            width={36}
            height={36}
            onPress={navigateToProfile}
          />
        }
      />
      <View style={styles.content}>
        <AppText>Welcome to Zap Home!</AppText>
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
    justifyContent: 'center',
  },
})
