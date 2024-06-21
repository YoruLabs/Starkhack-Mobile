import React, { ReactElement, useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Spacer } from '@components/Spacer'
import { AppText } from '@components/text/AppText'
import { AppColors } from '@utils/Colors'
import IonIcon from '@expo/vector-icons/Ionicons'
import { IPAD_EXTRA_PADDING } from '@utils/constants/Constants'
import { TextSize } from './text/Text'
import ViewFiller from './ViewFiller'

type Props = {
  options: string[]
  defaultIndex?: number
  onToggle: (index: number) => void
  align?: 'left' | 'right'
  dropdownWidth?: number
  textSize?: TextSize
  optionTextSize?: TextSize
}

const DropdownPicker = ({
  options,
  defaultIndex = 0,
  onToggle,
  align,
  dropdownWidth = 128 + 2 * IPAD_EXTRA_PADDING,
  textSize = 'very-small',
  optionTextSize = 'very-small',
}: Props): ReactElement => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const toggleDropdown = (): void => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  useEffect(() => {
    onToggle(activeIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.dropdownButton, width: dropdownWidth }}
        onPress={toggleDropdown}>
        <AppText
          size={textSize}
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{ maxWidth: dropdownWidth - 12 }}>
          {options[activeIndex]}
        </AppText>
        <ViewFiller />
        <IonIcon
          name={isDropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View
          style={{
            ...styles.dropdownContainer,
            left: align !== 'right' ? 0 : undefined,
            right: align === 'right' ? 0 : undefined,
          }}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionItem,
                index === options.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => {
                setActiveIndex(index)
                toggleDropdown()
              }}>
              <AppText size={optionTextSize}>{option}</AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dropdownButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: AppColors.white,
    height: 44,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    width: 140,
    backgroundColor: AppColors.greyBackground,
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: AppColors.border,
    marginTop: 4,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: AppColors.borderLight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default DropdownPicker
