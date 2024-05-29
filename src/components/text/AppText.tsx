/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from 'react'
import { useStyle } from 'react-native-style-utilities'
import { Text, TextProps } from 'react-native'
import { FontVariant, getFontName, getFontSize, getFontVariant, TextSize } from './Text'
import { IPAD_EXTRA } from '@utils/Constants'

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

  const fontName = useMemo(() => getFontName(size), [size])

  const customStyle = useStyle(
    () => [
      {
        fontFamily: getFontVariant(fontName, type),
        fontSize: getFontSize(size) + IPAD_EXTRA,
        color: color ?? colors.background.primaryForeground,
      },
      style,
    ],
    [color, colors.background, fontName, size, style, type],
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
