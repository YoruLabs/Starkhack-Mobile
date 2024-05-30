import { AppColors } from '@utils/Colors'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  vertical?: number
}

export function Divider({ vertical = 16 }: Props): ReactElement {
  return <View style={{ ...styles.divider, marginVertical: vertical }} />
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppColors.border,
    width: '100%',
  },
})
