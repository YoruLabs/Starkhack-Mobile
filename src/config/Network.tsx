import OfflineBanner from '@components/OfflineBanner'
import { useToast } from '@components/Toast'
import { useNetInfo } from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'
import Strings from '@utils/Strings'
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
} from 'react'

export interface NetworkContext {
  isOnline: boolean
  isOnlineOrNotifyUser: () => boolean
}

export const NetworkContext = createContext<NetworkContext | undefined>(undefined)

export const NetworkProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const { isInternetReachable, isConnected } = useNetInfo()
  const { addToast } = useToast()

  const isOnline =
    isConnected != null && isInternetReachable != null
      ? isInternetReachable && isConnected
      : true

  const isOnlineOrNotifyUser = (): boolean => {
    if (isOnline) {
      return isOnline
    }
    addToast({
      message: Strings.USER_IS_OFFLINE,
      type: 'error',
    })

    return isOnline
  }

  useEffect(() => {
    if (isInternetReachable == null) {
      return
    }
    onlineManager.setOnline(isInternetReachable)
    console.log('🪐', `isInternetReachable: ${isInternetReachable}`)
  }, [isInternetReachable])

  return (
    <NetworkContext.Provider
      value={{
        isOnline: isOnline,
        isOnlineOrNotifyUser: isOnlineOrNotifyUser,
      }}>
      {!isInternetReachable && <OfflineBanner />}
      {children}
    </NetworkContext.Provider>
  )
}

export const useNetwork = (): NetworkContext => {
  const context = useContext(NetworkContext)

  if (context === undefined) {
    throw new Error(
      'Network Context was null! Are you sure that you wrapped the entire App under a <NetworkProvider>?',
    )
  }

  return context
}
