import Header from '@components/Header'
import { AppColors } from '@utils/Colors'
import React, { ReactElement, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '@components/text/AppText'
import { ScreenProps } from '@navigation/Router'
import AppButton from '@components/AppButton'
import { useToast } from '@components/Toast'
import Strings from '@utils/Strings'
import { Spacer } from '@components/Spacer'
import { Card } from '@components/Card'
import ViewFiller from '@components/ViewFiller'

export default function PreviewSendScreen({
  navigation,
  route,
}: ScreenProps<'PreviewSend'>): ReactElement {
  const { details } = route.params
  const { addToast } = useToast()

  const [isLoading, setLoading] = useState(false)

  function onSendPress(): void {
    // TODO: Call the backebnd send function
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      addToast({
        message: Strings.SEND_SUCCESS,
        type: 'success',
      })
      navigation.navigate('Home')
    }, 2000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Preview Send" />
      <View style={styles.content}>
        <Card>
          <AppText size="small" type="medium" color={AppColors.darkGrey}>
            To
          </AppText>
          <ViewFiller />
          <AppText size="small" type="bold">
            {details.recipientEmail}
          </AppText>
        </Card>

        <Spacer vertical={16} />

        <Card flexDirection="column">
          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              Recipient gets
            </AppText>
            <ViewFiller />
            <AppText size="small" type="medium">
              {details.amount} {details.currency.code}
            </AppText>
          </View>

          <Spacer vertical={12} />

          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              Fees
            </AppText>
            <ViewFiller />
            <AppText size="small" type="medium">
              No fees
            </AppText>
          </View>

          <Spacer vertical={12} />

          <View style={{ flexDirection: 'row' }}>
            <AppText size="small" type="medium" color={AppColors.darkGrey}>
              Your total
            </AppText>
            <ViewFiller />
            <AppText size="small" type="medium">
              {details.amount} {details.currency.code}
            </AppText>
          </View>
        </Card>

        <Spacer vertical={16} />

        <Card>
          <AppText size="small" type="medium" color={AppColors.darkGrey}>
            Estimated arrival
          </AppText>
          <ViewFiller />
          <AppText size="small">Usually in seconds</AppText>
        </Card>

        <View style={styles.buttonContainer}>
          <AppButton label="Send" isLoading={isLoading} onPress={onSendPress} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.greyBackground,
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 16,
    alignSelf: 'center',
  },
})
