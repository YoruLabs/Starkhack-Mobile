import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { HomeStack } from './Router'
import { getScreenBuilder } from './ScreenRegistry'

const Stack = createNativeStackNavigator<HomeStack>()

const stackScreenOptions = {
  headerShown: false,
}

const getInitialScreen = (): keyof HomeStack => {
  return 'Home'
}

const HomeNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator
      initialRouteName={getInitialScreen()}
      screenOptions={stackScreenOptions}>
      <Stack.Screen name="Home" getComponent={getScreenBuilder('Home')} />
    </Stack.Navigator>
  )
}

export default HomeNavigator
