import { AppColors } from '@utils/Colors'
import { Image, ImageSource, ImageStyle } from 'expo-image'
import React, { ReactElement } from 'react'
import { PressableOpacity } from 'react-native-pressable-opacity'
import { useStyle } from 'react-native-style-utilities'

type Props = {
  source?: string | number | ImageSource | ImageSource[] | string[] | null | undefined
  width?: number
  height?: number
  backgroundColor?: string
  borderRadius?: number
  borderColor?: string
  borderWidth?: number
  customStyles?: ImageStyle
  onPress?: () => void
}

export function AppImage({
  source,
  width = 44,
  height = 44,
  backgroundColor = 'transparent',
  borderRadius = 8,
  borderColor = AppColors.black,
  borderWidth = 0,
  customStyles,
  onPress,
}: Props): ReactElement {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

  const imageStyle = useStyle(
    () => [
      {
        backgroundColor: backgroundColor,
        width: width,
        height: height,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
      },
      customStyles,
    ],
    [
      customStyles,
      width,
      height,
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius,
    ],
  )

  return (
    <PressableOpacity onPress={onPress}>
      <Image
        style={imageStyle}
        source={source}
        placeholder={{ blurhash: blurhash }}
        contentFit="contain"
        transition={0}
      />
    </PressableOpacity>
  )
}
