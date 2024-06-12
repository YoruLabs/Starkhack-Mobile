import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import React, { ReactElement, useRef } from 'react'

import { ClosableBackdrop, NonClosableBackdrop } from './AppBottomSheetBackdrop'

type Props = BottomSheetProps & {
  closeOnTappingBackdrop?: boolean
}

export function BottomSheetContainer({
  children,
  closeOnTappingBackdrop = false,
  ...props
}: Props): ReactElement {
  const navigation = useNavigation()
  const bottomSheet = useRef<BottomSheet>(null)

  return (
    <BottomSheet
      index={0}
      ref={bottomSheet}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onClose={navigation.goBack}
      backdropComponent={closeOnTappingBackdrop ? ClosableBackdrop : NonClosableBackdrop}
      {...props}>
      {children}
    </BottomSheet>
  )
}
