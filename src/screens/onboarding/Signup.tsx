import { authenticateUser } from '@api/user'
import { AppText } from '@components/text/AppText'
import { useMutation } from '@tanstack/react-query'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'

export default function SignupScreen(): ReactElement {
  const { mutate: signupUser, isPending } = useMutation({
    mutationFn: authenticateUser,
  })

  const onSubmit = (): void => {
    //signupUser()
  }

  return (
    <View style={styles.container}>
      <AppText>Signup</AppText>
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
