import React, { ReactElement, useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { AppText } from './AppText'
import { AppColors } from '@utils/Colors'
import { Spacer } from '@components/Spacer'
import IonIcons from '@expo/vector-icons/Ionicons'

type Props = {
  text: string
  maxLines?: number
  showMoreText?: string
  showLessText?: string
  onPressMore?: () => void
}

export default function ShowMoreText({
  text,
  maxLines = 2,
  showMoreText = 'Show more',
  showLessText = 'Show less',
  onPressMore,
}: Props): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = (): void => {
    setIsExpanded(!isExpanded)
  }

  return (
    <View style={styles.container}>
      <AppText size="small" numberOfLines={isExpanded ? undefined : maxLines}>
        {text}
      </AppText>
      {text.length > maxLines * 50 && (
        <TouchableOpacity
          onPress={onPressMore ?? toggleExpanded}
          style={styles.showMoreContainer}>
          <AppText size="small" type="medium" color={AppColors.blue}>
            {isExpanded ? showLessText : showMoreText}
          </AppText>
          <Spacer horizontal={2} />
          <IonIcons name="chevron-down" size={22} color={AppColors.blue} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  showMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
