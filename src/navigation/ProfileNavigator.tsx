import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { ProfileStack } from './Router'
import { getScreenBuilder } from './ScreenRegistry'

const Stack = createNativeStackNavigator<ProfileStack>()

const stackScreenOptions = {
  headerShown: false,
}

const getInitialScreen = (): keyof ProfileStack => {
  return 'Profile'
}

const ProfileNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator
      initialRouteName={getInitialScreen()}
      screenOptions={stackScreenOptions}>
      <Stack.Screen name="Profile" getComponent={getScreenBuilder('Profile')} />
      <Stack.Screen
        name="ResetPassword"
        getComponent={getScreenBuilder('ResetPassword')}
      />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
