import { ToastTypes, useColorStyles } from '@hooks/useColorStyles'
import { AppColors } from '@utils/Colors'
import { BORDER_RADIUS, EDGE_SPACING } from '@utils/Constants'
import { hapticFeedback } from '@utils/HapticFeedback'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
  Easing,
  EntryExitAnimationFunction,
  Layout,
  SlideInDown,
  useWorkletCallback,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Icons from '@expo/vector-icons/Ionicons'

import { AppText } from './text/AppText'
import { HapticFeedbackTypes } from 'react-native-haptic-feedback'

type ToastProviderProps = ViewProps
const MAX_TOASTS = 3

const LayoutAnimation = new Layout().mass(1).damping(500).stiffness(1200).springify()
const EnteringAnimation = new SlideInDown()
  .mass(1)
  .damping(500)
  .stiffness(1200)
  .springify()

export interface Toast {
  message: string
  /**
   * Ionicon Icon name
   */
  icon?: string
  type?: ToastTypes
}
type ToastInternal = Toast & { id: number }

let toastId = 0

interface ToastContext {
  addToast: (toast: Omit<Toast, 'id'>) => void
}

const ToastContext = React.createContext<ToastContext | undefined>(undefined)

export function useToast(): ToastContext {
  const context = useContext(ToastContext)
  if (context == null) {
    throw new Error(
      'Toast Context was null! Are you sure that you wrapped the entire App under a <ToastProvider>?',
    )
  }

  return context
}

export function ToastProvider(props: ToastProviderProps): React.ReactElement {
  const [toasts, setToasts] = useState<ToastInternal[]>([])
  const colorStyles = useColorStyles()

  const addToast = useCallback((toast: Toast): void => {
    hapticFeedback(
      toast.type === 'error'
        ? HapticFeedbackTypes.notificationError
        : HapticFeedbackTypes.impactLight,
    )
    const id = ++toastId
    const newToast: ToastInternal = { ...toast, id: id }
    // insert toast
    setToasts((currentToasts) => {
      let newToasts = currentToasts
      if (newToasts.length >= MAX_TOASTS) newToasts = newToasts.slice(-MAX_TOASTS)

      return [...newToasts, newToast]
    })

    // after 3s remove toast again
    setTimeout(() => {
      setToasts((currentToasts) => {
        const index = currentToasts.indexOf(newToast)
        if (index !== -1) {
          currentToasts.splice(index, 1)
          return [...currentToasts]
        } else {
          return currentToasts
        }
      })
    }, 3000)
  }, [])

  const providerValue = useMemo<ToastContext>(() => ({ addToast: addToast }), [addToast])

  const exitingAnimation: EntryExitAnimationFunction = useWorkletCallback(() => {
    return {
      initialValues: {
        opacity: 1,
        transform: [
          {
            scale: 1,
          },
        ],
      },
      animations: {
        opacity: withTiming(0, { duration: 150, easing: Easing.linear }),
        transform: [
          {
            scale: withSpring(0, { mass: 3, stiffness: 200, damping: 600 }),
          },
        ],
      },
    }
  }, [])

  console.log('🔄', `Re-rendering ToastProvider.tsx with ${toasts.length} toasts...`)

  const ToastContent = toasts.map((toast, index) => (
    <Animated.View
      key={toast.id}
      entering={EnteringAnimation}
      exiting={exitingAnimation}
      layout={LayoutAnimation}
      style={[
        styles.toast,
        colorStyles.toast[toast.type ?? 'default'],
        { zIndex: index },
      ]}>
      {toast.icon && <Icons name={toast.icon} color="#f0f0f0" size={14} />}
      <AppText style={styles.toastMessage} color={AppColors.primary} size="small">
        {toast.message}
      </AppText>
    </Animated.View>
  ))

  return (
    <ToastContext.Provider value={providerValue}>
      {props.children}

      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          style={styles.toastsContainer}
          behavior="padding"
          pointerEvents="box-none">
          {ToastContent}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.toastsContainer} pointerEvents="box-none">
          {ToastContent}
        </View>
      )}
    </ToastContext.Provider>
  )
}

const styles = StyleSheet.create({
  toastsContainer: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: 20,
    paddingBottom: EDGE_SPACING,
    paddingHorizontal: EDGE_SPACING + 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: BORDER_RADIUS,
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  toastMessage: {
    marginLeft: 5,
  },
})
