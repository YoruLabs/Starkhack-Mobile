import React, { ReactElement } from 'react'
import { StatusBar, StatusBarProps } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

const FocusAwareStatusBar = (props: StatusBarProps): ReactElement | null => {
  const isFocused = useIsFocused()

  return isFocused ? <StatusBar {...props} /> : null
}

export default FocusAwareStatusBar
