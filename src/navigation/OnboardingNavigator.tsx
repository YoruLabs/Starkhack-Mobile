import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { OnboardingStack } from './Router'
import { getScreenBuilder } from './ScreenRegistry'

const Stack = createNativeStackNavigator<OnboardingStack>()

const stackScreenOptions = {
  headerShown: false,
}

const getInitialScreen = (): keyof OnboardingStack => {
  return 'Welcome'
}

const OnboardingNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator
      initialRouteName={getInitialScreen()}
      screenOptions={stackScreenOptions}>
      <Stack.Screen name="Welcome" getComponent={getScreenBuilder('Welcome')} />
      <Stack.Screen name="Signup" getComponent={getScreenBuilder('Signup')} />
    </Stack.Navigator>
  )
}

export default OnboardingNavigator
