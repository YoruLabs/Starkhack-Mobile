import { ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ProfileScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
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
