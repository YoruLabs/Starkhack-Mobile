import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { AppState, StatusBar, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MainNavigator } from './navigation/MainNavigator'
import { AppColors } from './utils/Colors'
import { ReactElement, useCallback, useRef } from 'react'
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query'
import { NetworkProvider } from '@config/Network'

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

  const onStateChange = useCallback(() => {
    const previousRouteName = currentScreenName.current
    const currentRouteName = navigationContainer.current?.getCurrentRoute()?.name

    if (previousRouteName !== currentRouteName)
      console.log('🧭', `Navigating from ${previousRouteName} -> ${currentRouteName}...`)

    currentScreenName.current = currentRouteName
  }, [])

  console.log('🔄', 'Re-rendering App()...')

  const onReady = useCallback(() => {
    console.log('🧭', 'Navigation Container is ready!')
    currentScreenName.current = navigationContainer.current?.getCurrentRoute()?.name
  }, [])

  const queryClient = new QueryClient()

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={AppColors.white} />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer
          ref={navigationContainer}
          onReady={onReady}
          onStateChange={onStateChange}>
          <NetworkProvider>
            <MainNavigator />
          </NetworkProvider>
        </NavigationContainer>
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
