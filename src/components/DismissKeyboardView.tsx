import React, { ReactNode, ComponentType } from 'react'
import { TouchableWithoutFeedback, Keyboard, View, ViewProps } from 'react-native'

type DismissKeyboardHOCProps<P> = P & {
  children?: ReactNode
}

function withDismissKeyboard<P extends object>(
  WrappedComponent: ComponentType<P>,
): ComponentType<DismissKeyboardHOCProps<P>> {
  return ({ children, ...props }: DismissKeyboardHOCProps<P>) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <WrappedComponent {...(props as P)}>{children}</WrappedComponent>
    </TouchableWithoutFeedback>
  )
}

export const DismissKeyboardView = withDismissKeyboard<ViewProps>(View)
