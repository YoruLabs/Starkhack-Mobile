import { AppColors } from '@utils/Colors'
import { SAFE_TOP } from '@utils/constants/Constants'
import React, { ReactElement } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from '@expo/vector-icons/Ionicons'
import { AppText } from './text/AppText'

const OfflineBanner = (): ReactElement | null => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={AppColors.warning} barStyle="light-content" />
      <Icons
        name="cloud-offline-outline"
        color={AppColors.white}
        size={16}
        style={styles.icon}
      />
      <AppText color={AppColors.white} type="medium" size="very-small">
        You are currently offline
      </AppText>
    </SafeAreaView>
  )
}

export default OfflineBanner

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.warning,
    paddingTop: SAFE_TOP,
    paddingBottom: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 6,
  },
})
