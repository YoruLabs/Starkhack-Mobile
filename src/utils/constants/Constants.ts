// All app constants

import { Dimensions, Platform } from 'react-native'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

export const EDGE_SPACING = 20

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH

export const IS_IOS = Platform.OS === 'ios'
export const IS_ANDROID = Platform.OS === 'android'

// Auto scales components if running the app on IPad
export const IS_IPAD = IS_IOS && SCREEN_ASPECT_RATIO < 1.6
export const IPAD_FACTOR = IS_IPAD ? 1.5 : 1
export const IPAD_EXTRA = IS_IPAD ? 4 : 0
export const IPAD_EXTRA_PADDING = IS_IPAD ? 8 : 0

export const BORDER_RADIUS = 8

export const KAV_BEHAVIOR = IS_IOS ? 'padding' : undefined

export const SAFE_TOP = IS_IOS ? StaticSafeAreaInsets.safeAreaInsetsTop : 0
export const SAFE_LEFT = StaticSafeAreaInsets.safeAreaInsetsLeft
export const SAFE_RIGHT = StaticSafeAreaInsets.safeAreaInsetsRight
export const SAFE_BOTTOM = IS_IOS ? StaticSafeAreaInsets.safeAreaInsetsBottom : 0

export const IS_TESTNET = true

export const RPC_ENDPOINT = IS_TESTNET
  ? 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7'
  : 'https://4aed816c730e.ngrok.app'

export const USDC_ADDRESS = IS_TESTNET
  ? '0x3132835d7641b22315a468675af1606bb447c940985003365d81ae31c7e2142'
  : '0x007c28b8071e9cbcf9d807d47893a5676f01c147178d1915c67b41b37f1c77f3'
export const WBTC_ADDRESS = IS_TESTNET
  ? '0x7e219e3a16ea835ce0ea2c92963eab1234ab954ea3f4052ccb46896d5e41458'
  : ''
export const WETH_ADDRESS = IS_TESTNET
  ? '0x2ac7f02a1848616b315e8d5db888f665ea09afa24f45134fc3e826480f94045'
  : ''
export const USDT_ADDRESS = IS_TESTNET
  ? '0x1acc610b225ba150297eae6234471d2da0331031d753ebec7d54c1c285a5118'
  : ''
export const STRK_ADDRESS = IS_TESTNET
  ? '0x15f6e43f328943b0c5eb2b34f44a0ca6859ee6ff244b12619f2b3b23d2167f6'
  : ''

export const ZAP_ACCOUNT_CLASS_HASH = IS_TESTNET
  ? '0x04a21497b8da2c5d101947d7eda45067a5e08313bbca302803ee73be1e649407'
  : '0x07a9f83e9db2cf434c3f895b79eaeb4bb40dc89edf784265e37633c32bfd1ee0'
