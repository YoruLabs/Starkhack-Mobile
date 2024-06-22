import Header from '@components/Header'
import { AppColors } from '@utils/Colors'
import React, { ReactElement, useState } from 'react'
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '@components/text/AppText'
import {
  DataProofItem,
  ProofCategory,
  ProofResult,
  proofCategories,
  proofList,
} from 'types/data-proof'
import { EmptyList } from '@components/EmptyList'
import { Card } from '@components/Card'
import AppButton from '@components/AppButton'
import { AppImage } from '@components/AppImage'
import { Spacer } from '@components/Spacer'
import IonIcons from '@expo/vector-icons/Ionicons'
import { isEmpty } from '@utils/util'
import { REDIRECT_URI, STRAVA_AUTH_URL } from '@utils/Credentials'
import * as RNWebBrowser from 'expo-web-browser'

type ProofProp = {
  proofItem: DataProofItem
}

function ListItem({ proofItem }: ProofProp): ReactElement {
  const [code, setCode] = useState('')

  const onPress = async (): Promise<void> => {
    const result = (await RNWebBrowser.openAuthSessionAsync(
      STRAVA_AUTH_URL,
      REDIRECT_URI,
    )) as ProofResult

    if (result.type === 'cancel') return

    const { url } = result
    // Extract authorization code
    const authCode = url.substring(
      url.indexOf('code=') + 5,
      url.indexOf('&', url.indexOf('code=')),
    )
    setCode(authCode)
  }

  return (
    <Card flexDirection="column">
      <View style={{ flexDirection: 'row' }}>
        <AppImage source={proofItem.icon} width={48} height={48} />
        <View style={{ flex: 1, marginLeft: 16, alignSelf: 'center' }}>
          <AppText type="medium">{proofItem.name}</AppText>
          <Spacer vertical={2} />
          <AppText size="very-small" type="regular">
            {proofItem.description}
          </AppText>
        </View>
      </View>
      {!isEmpty(code) && (
        <>
          <Spacer vertical={16} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText>Proof Verified</AppText>
            <Spacer horizontal={4} />
            <IonIcons name="checkmark-circle" size={16} color="green" />
          </View>
        </>
      )}

      <Spacer vertical={16} />
      <AppButton label="Proof Strava" onPress={onPress} />
    </Card>
  )
}

export default function DataProofsScreen(): ReactElement {
  const [selectedItem, setSelectedItem] = useState<ProofCategory>('Fitness')

  const tabItemView: ListRenderItem<ProofCategory> = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedItem(item)}
      style={{
        ...styles.tabItem,
        backgroundColor: selectedItem === item ? AppColors.primary : AppColors.white,
      }}>
      <AppText color={selectedItem === item ? AppColors.white : AppColors.primary}>
        {item}
      </AppText>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Data proofs" />
      <View style={styles.content}>
        <Spacer vertical={8} />
        <View style={{ height: 44, paddingHorizontal: 6 }}>
          <FlatList
            data={proofCategories}
            renderItem={tabItemView}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            extraData={selectedItem}
          />
        </View>

        <FlatList
          data={proofList.filter((item) => item.category === selectedItem)}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <ListItem proofItem={item} />}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={<EmptyList text="No Apps Available" />}
        />
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
    paddingTop: 12,
    backgroundColor: AppColors.greyBackgroundDark,
  },
  list: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 16,
  },
  tabItem: {
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
  },
})
