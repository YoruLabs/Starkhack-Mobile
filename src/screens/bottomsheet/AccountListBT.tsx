import { AppText } from '@components/text/AppText'
import { Atoms } from '@state/Atoms'
import { Currency, currencies } from 'types/transaction'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { ReactElement } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { BottomSheetContainer } from '@components/BottomSheetContainer'
import Header from '@components/Header'
import { ScreenProps } from '@navigation/Router'
import { AppImage } from '@components/AppImage'
import { Spacer } from '@components/Spacer'
import { PressableOpacity } from 'react-native-pressable-opacity'
import { AppColors } from '@utils/Colors'

export default function AccountListBT({
  navigation,
}: ScreenProps<'AccountListBT'>): ReactElement {
  const balance = useAtomValue(Atoms.Balance)
  const setCurrentAccount = useSetAtom(Atoms.CurrentAccount)
  const currencyList = currencies as Currency[]
  const snapPoints = React.useMemo(() => [640, 640], [])

  return (
    <BottomSheetContainer closeOnTappingBackdrop={true} snapPoints={snapPoints}>
      <View style={styles.container}>
        <Header
          title="Select Account"
          backType="close"
          onBackPress={() => navigation.goBack()}
        />
        <FlatList
          data={currencyList}
          renderItem={({ item }) => {
            return (
              <PressableOpacity
                style={styles.listItem}
                onPress={() => {
                  setCurrentAccount(item)
                  navigation.goBack()
                }}>
                <AppImage source={item.symbol} width={40} height={40} />
                <Spacer horizontal={12} />
                <AppText>{item.name}</AppText>
                <View style={styles.balanceContainer}>
                  <AppText size="small" color={AppColors.darkGrey}>
                    {item.code}
                  </AppText>
                  <Spacer horizontal={4} />
                  <AppText type="medium">
                    {balance.find((b) => b.currencyCode === item.code)?.amount ?? 0}
                  </AppText>
                </View>
              </PressableOpacity>
            )
          }}
          keyExtractor={(item) => item.code}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </BottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  listContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },
})
