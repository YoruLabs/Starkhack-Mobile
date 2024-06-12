import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import React, { ReactElement } from 'react'
import { BottomSheetStack, MainStack } from './Router'
import { getScreenBuilder } from './ScreenRegistry'
import { useAtomValue } from 'jotai'
import { Atoms } from '@state/Atoms'

const Stack = createNativeStackNavigator<MainStack & BottomSheetStack>()

const stackScreenOptions = {
  headerShown: false,
  headerBackTitle: '',
  headerTintColor: '#000',
}

export const bottomSheetScreenOptions: NativeStackNavigationOptions = {
  presentation: 'containedTransparentModal',
  headerShown: false,
  contentStyle: { backgroundColor: 'transparent' },
  animation: 'none',
}

export const BottomSheets = ['AccountListBT'] as const

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

      <Stack.Group screenOptions={bottomSheetScreenOptions}>
        {BottomSheets.map((bottomSheet) => (
          <Stack.Screen
            key={bottomSheet}
            name={bottomSheet}
            getComponent={getScreenBuilder(bottomSheet)}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}
