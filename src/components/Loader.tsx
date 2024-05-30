import { AppColors } from '@utils/Colors'
import React, { ReactElement } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

type Props = {
  isFullScreen?: boolean
}

export function Loader({ isFullScreen = true }: Props): ReactElement {
  return (
    <View style={isFullScreen ? styles.fullContainer : styles.container}>
      <ActivityIndicator />
    </View>
  )
}

const styles = StyleSheet.create({
  fullContainer: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 0.6,
    backgroundColor: AppColors.greyBackground,
    zIndex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
