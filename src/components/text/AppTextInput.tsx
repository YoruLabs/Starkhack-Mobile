import { InputStyleTypes, useColorStyles } from '@hooks/useColorStyles'
import { AppColors } from '@utils/Colors'
import { BORDER_RADIUS } from '@utils/Constants'
import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useStyle } from 'react-native-style-utilities'

export type AppTextInputProps = TextInputProps & {
  isError?: boolean
  isSuccess?: boolean
  customContainerStyles?: ViewStyle
  customTextStyles?: TextStyle
  PrefixIcon?: JSX.Element
  onPress?: () => void
  useBottomSheetTextInput?: boolean
}

export function AppTextInput({
  isError,
  isSuccess,
  customContainerStyles,
  customTextStyles,
  PrefixIcon,
  onPress,
  ...props
}: AppTextInputProps): React.ReactElement {
  const colorsStyles = useColorStyles()
  const [type, clearType] = useState<InputStyleTypes>('default')
  useEffect(() => {
    if (isError) {
      clearType('error')
    } else if (isSuccess) {
      clearType('success')
    } else {
      clearType('default')
    }
  }, [isError, isSuccess])

  const inputStyles = useStyle(() => {
    return [styles.input, customTextStyles]
  }, [customTextStyles])

  const containerStyles = useStyle(() => {
    return [styles.container, colorsStyles.inputStyles[type], customContainerStyles]
  }, [colorsStyles.inputStyles, type, customContainerStyles])

  const Component = TextInput
  const inputRef = useRef<typeof Component>(null)

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      {PrefixIcon == null ? null : <View style={styles.prefixIcon}>{PrefixIcon}</View>}
      <Component
        // @ts-ignore
        ref={inputRef}
        numberOfLines={5}
        underlineColorAndroid="transparent"
        style={inputStyles}
        placeholderTextColor={AppColors.darkGrey}
        allowFontScaling={false}
        {...props}
        onChangeText={(text) => {
          if (type !== 'default') {
            clearType('default')
          }
          props.onChangeText?.(text)
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    width: '100%',
    height: 44,
    borderWidth: 1,
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  prefixIcon: {
    alignContent: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    color: AppColors.black,
    fontSize: 16,
  },
})
