import { authenticateUser } from '@api/user'
import { useMutation } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function SignupScreen(): ReactElement {

  const {mutate: signupUser, isPending}  = useMutation({
    mutationFn: authenticateUser
  })

  const onSubmit = (): void => {
    //signupUser()
  }

  return (
    <View style={styles.container}>
      <Text>Signup</Text>
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
