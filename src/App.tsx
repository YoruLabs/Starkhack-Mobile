import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import React, { AppState, StatusBar, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MainNavigator } from './navigation/MainNavigator'
import { AppColors } from './utils/Colors'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query'
import { NetworkProvider } from '@config/Network'
import { ToastProvider } from '@components/Toast'
import { Provider as JotaiProvider, useAtomValue } from 'jotai'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Atoms } from '@state/Atoms'
import { setHeaders } from '@config/ZapAPI'
import Toast from 'react-native-toast-message'

let appState = AppState.currentState
AppState.addEventListener('change', (newAppState) => {
  console.log('🧭', `App State changed: ${appState} -> ${newAppState}`)
  focusManager.setFocused(Boolean(newAppState))
  appState = newAppState
})
AppState.addEventListener('memoryWarning', () => {
  console.warn('🚧', 'Received a memory warning!')
})

function App(): ReactElement {
  const currentScreenName = useRef<string>()
  const navigationContainer = useRef<NavigationContainerRef<never>>(null)
  const isLoggedIn = useAtomValue(Atoms.LoggedIn)
  const authTokens = useAtomValue(Atoms.AuthTokens)

  const onStateChange = useCallback(() => {
    const previousRouteName = currentScreenName.current
    const currentRouteName = navigationContainer.current?.getCurrentRoute()?.name

    if (previousRouteName !== currentRouteName)
      console.log('🧭', `Navigating from ${previousRouteName} -> ${currentRouteName}...`)

    currentScreenName.current = currentRouteName
  }, [])

  const onReady = useCallback(() => {
    console.log('🧭', 'Navigation Container is ready!')
    currentScreenName.current = navigationContainer.current?.getCurrentRoute()?.name
  }, [])

  console.log('🔄', 'Re-rendering App()...')

  if (isLoggedIn) {
    setHeaders(authTokens)
  }

  const queryClient = new QueryClient()

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={AppColors.white} />
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <RootSiblingParent>
            <ToastProvider>
              <NavigationContainer
                ref={navigationContainer}
                onReady={onReady}
                onStateChange={onStateChange}>
                <NetworkProvider>
                  <MainNavigator />
                </NetworkProvider>
              </NavigationContainer>
              <Toast />
            </ToastProvider>
          </RootSiblingParent>
        </JotaiProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default App
