import { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import React, { ReactElement } from 'react'
import { StatusBar } from 'react-native'

type Props = BottomSheetBackdropProps & {
  closeOnTappingBackdrop: boolean
}

export function AppBottomSheetBackdrop(props: Props): ReactElement {
  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" barStyle="light-content" />
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        appearsOnIndex={0}
        opacity={0.7}
        disappearsOnIndex={-1}
        pressBehavior={props.closeOnTappingBackdrop ? 'close' : 'none'}
      />
    </>
  )
}

export const ClosableBackdrop = (props: BottomSheetBackdropProps): ReactElement => (
  <AppBottomSheetBackdrop {...props} closeOnTappingBackdrop={true} />
)

export const NonClosableBackdrop = (props: BottomSheetBackdropProps): ReactElement => (
  <AppBottomSheetBackdrop {...props} closeOnTappingBackdrop={false} />
)
