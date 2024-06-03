/* eslint-disable @typescript-eslint/no-var-requires */
import { ImageSource } from 'expo-image'
import type { SvgProps } from 'react-native-svg'

export const LOGO_ICON = require('./png/logo.png') as ImageSource

export type IconProps = SvgProps & {
  size?: number
  tintColor?: string
  color?: string
  outline?: boolean
  tint?: string
}
