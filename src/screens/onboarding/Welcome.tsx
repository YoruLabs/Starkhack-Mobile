import { AppText } from '@components/text/AppText'
import { ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function WelcomeScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <AppText size='small'>Welcome to Zap!</AppText>
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
