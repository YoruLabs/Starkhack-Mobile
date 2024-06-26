import {IconProps} from '../icons'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function BackIcon(props: IconProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      // @ts-ignore
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M15 19l-7-7 7-7"
        stroke={props.tintColor ?? '#111928'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default BackIcon
