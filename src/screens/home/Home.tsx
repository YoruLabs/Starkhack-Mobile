import { AppImage } from '@components/AppImage'
import Header from '@components/Header'
import { AppText } from '@components/text/AppText'
import { useNavigation } from '@react-navigation/native'
import { Atoms } from '@state/Atoms'
import { AppColors } from '@utils/Colors'
import { useAtomValue } from 'jotai'
import React, { ReactElement, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getHardwareSecurityLevel } from '../../../modules/expo-enclave'
import AppButton from '@components/AppButton'
import { isEmpty } from '@utils/util'
import { Spacer } from '@components/Spacer'
import { PressableOpacity } from 'react-native-pressable-opacity'

export default function HomeScreen(): ReactElement {
  const mainNavigation = useNavigation()
  const user = useAtomValue(Atoms.User)
  const [securityLevel, setSecurityLevel] = useState('')

  function navigateToProfile(): void {
    mainNavigation.navigate('ProfileStack', {
      screen: 'Profile',
    })
  }

  // @danilo Test function to get hardware security level
  async function getHardwareLevel(): Promise<void> {
    setSecurityLevel(await getHardwareSecurityLevel())
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Zap"
        headerRight={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <AppButton
                label="Experiment"
                onPress={() =>
                  mainNavigation.navigate('ProfileStack', { screen: 'Experiment' })
                }
                customStyles={{ width: 100, height: 36, marginRight: 16 }}
              />
            </View>

            <AppImage
              source={user?.photo}
              width={36}
              height={36}
              onPress={navigateToProfile}
            />
          </View>
        }
      />
      <View style={styles.content}>
        <AppText>Welcome to Zap Home!</AppText>
        <Spacer vertical={24} />
        {!isEmpty(securityLevel) && (
          <AppText>Hardware security level - {securityLevel}</AppText>
        )}
        <Spacer vertical={12} />
        <AppButton label="Check Security Level" onPress={getHardwareLevel} />
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
