/* eslint-disable @typescript-eslint/no-var-requires */
import type { SvgProps } from 'react-native-svg'

export type IconProps = SvgProps & {
  size?: number
  tintColor?: string
  color?: string
  outline?: boolean
  tint?: string
}
