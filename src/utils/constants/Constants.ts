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
