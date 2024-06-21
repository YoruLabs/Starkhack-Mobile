import React from 'react'
import { useStyle } from 'react-native-style-utilities'
import { Text, TextProps } from 'react-native'
import { FontVariant, getFontSize, TextSize } from './Text'
import { IPAD_EXTRA } from '@utils/constants/Constants'

interface AppTextProps extends TextProps {
  size?: TextSize
  color?: string
  type?: FontVariant
}

export function AppText({
  style,
  color,
  size = 'normal',
  type = 'regular',
  ...props
}: AppTextProps): React.ReactElement {
  const colors = { background: { primaryForeground: '#000' } }

  const customStyle = useStyle(
    () => [
      {
        fontWeight: type,
        fontSize: getFontSize(size) + IPAD_EXTRA,
        color: color ?? colors.background.primaryForeground,
      },
      style,
    ],
    [color, colors.background, size, style, type],
  )

  return (
    // eslint-disable-next-line react/forbid-elements
    <Text
      selectionColor="#000"
      ellipsizeMode="tail"
      allowFontScaling={false}
      {...props}
      style={customStyle}
    />
  )
}
