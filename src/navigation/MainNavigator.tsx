import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { ReactElement } from 'react'
import { MainStack } from './Router'
import { getScreenBuilder } from './ScreenRegistry'
import { useAtomValue } from 'jotai'
import { Atoms } from '@state/Atoms'

const Stack = createNativeStackNavigator<MainStack>()

const stackScreenOptions = {
  headerShown: false,
  headerBackTitle: '',
  headerTintColor: '#000',
}

export const MainNavigator = (): ReactElement => {
  const isLoggedIn = useAtomValue(Atoms.LoggedIn)

  const getInitialScreen = (): keyof MainStack => {
    if (isLoggedIn) {
      return 'HomeStack'
    } else {
      return 'HomeStack'
    }
  }

  console.log('isLoggedIn: ', isLoggedIn)

  return (
    <Stack.Navigator
      initialRouteName={getInitialScreen()}
      screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen
          name="OnboardingStack"
          getComponent={getScreenBuilder('OnboardingStack')}
        />
        <Stack.Screen
          name="ProfileStack"
          getComponent={getScreenBuilder('ProfileStack')}
        />
        <Stack.Screen name="HomeStack" getComponent={getScreenBuilder('HomeStack')} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
