import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppText } from './text/AppText'

type Props = {
  text?: string
  paddingBottom?: number
}

export function EmptyList({
  text = 'No updates',
  paddingBottom = 32,
}: Props): ReactElement {
  return (
    <View style={{ ...styles.emptyList, paddingBottom: paddingBottom }}>
      <AppText>{text}</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
