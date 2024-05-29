import BackIcon from '@assets/icons/back'
import { useNavigation } from '@react-navigation/native'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { PressableOpacity } from 'react-native-pressable-opacity'
import { Divider } from './Divider'
import { Spacer } from './Spacer'
import { AppText } from './text/AppText'
import ViewFiller from './ViewFiller'
import { AppColors } from '@utils/Colors'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import { useNetwork } from '@config/Network'
import { IPAD_EXTRA_PADDING, SAFE_TOP, SCREEN_WIDTH } from '@utils/Constants'

type Props = {
  title?: string
  headerRight?: React.ReactNode
  onBackPress?: () => void
  darker?: boolean
  onPress?: () => void
}

export default function Header({
  title = '',
  headerRight,
  onBackPress,
  darker = false,
  onPress,
}: Props): ReactElement {
  const navigation = useNavigation()
  const { isOnline } = useNetwork()

  const Container = onPress !== undefined ? PressableOpacity : View

  return (
    <>
      {isOnline && darker && (
        <FocusAwareStatusBar
          backgroundColor={AppColors.primary}
          barStyle="light-content"
        />
      )}
      <Container
        onPress={onPress}
        activeOpacity={0.95}
        style={[
          styles.headerContainer,
          darker === true && styles.headerContainerDarker,
          darker === true && isOnline === true && { paddingTop: SAFE_TOP },
        ]}>
        {navigation.canGoBack() && (onBackPress !== undefined || !darker) ? (
          <PressableOpacity
            style={styles.backContainer}
            onPress={() =>
              onBackPress !== undefined ? onBackPress() : navigation.goBack()
            }>
            <BackIcon tintColor={darker ? AppColors.white : AppColors.primary} />
          </PressableOpacity>
        ) : (
          <View style={styles.emptyFiller} />
        )}

        <AppText
          type="medium"
          color={darker ? AppColors.white : AppColors.black}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.headerTitle}>
          {title}
        </AppText>

        {headerRight !== undefined && (
          <>
            <ViewFiller />
            <View style={styles.right}>{headerRight}</View>
          </>
        )}
      </Container>

      {!darker && (
        <>
          <Spacer vertical={4} />
          <Divider vertical={0} />
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: IPAD_EXTRA_PADDING,
  },
  headerContainerDarker: {
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: AppColors.primary,
  },
  backContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyFiller: {
    width: 16,
    height: 48,
  },
  right: {
    marginRight: 18,
  },
  headerTitle: {
    maxWidth: SCREEN_WIDTH * 0.6,
  },
})
