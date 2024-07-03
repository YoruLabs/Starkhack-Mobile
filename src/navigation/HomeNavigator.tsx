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
      <Stack.Screen name="Transactions" getComponent={getScreenBuilder('Transactions')} />
      <Stack.Screen name="Send" getComponent={getScreenBuilder('Send')} />
      <Stack.Screen name="PreviewSend" getComponent={getScreenBuilder('PreviewSend')} />
      <Stack.Screen
        name="TransactionDetails"
        getComponent={getScreenBuilder('TransactionDetails')}
      />
      <Stack.Screen name="DataProofs" getComponent={getScreenBuilder('DataProofs')} />
      <Stack.Screen name="AddMoney" getComponent={getScreenBuilder('AddMoney')} />
      <Stack.Screen name="Exchange" getComponent={getScreenBuilder('Exchange')} />
    </Stack.Navigator>
  )
}

export default HomeNavigator
