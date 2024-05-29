import { AppText } from '@components/text/AppText'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'

export default function ProfileScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <AppText>Profile</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
