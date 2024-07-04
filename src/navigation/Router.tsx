import type { NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RouteProp as NRouteProp } from '@react-navigation/native'
import { Currency, SendDetails, Transaction } from 'types/transaction'

export type MainStack = {
  OnboardingStack: NavigatorScreenParams<OnboardingStack>
  ProfileStack: NavigatorScreenParams<ProfileStack>
  HomeStack: NavigatorScreenParams<HomeStack>
}

export type OnboardingStack = {
  Welcome: undefined
  RevolutWeb: undefined
}

export type ProfileStack = {
  Profile: undefined
  Experiment: undefined
}

export type HomeStack = {
  Home: undefined
  Transactions: undefined
  Send: undefined
  PreviewSend: {
    details: SendDetails
  }
  TransactionDetails: {
    transaction: Transaction
  }
  DataProofs: undefined
  AddMoney: undefined
  Exchange: undefined
}

export type BottomSheetStack = {
  AccountListBT: {
    title: string
    showAmount?: boolean
    type?: 'crypto' | 'fiat' | 'all'
    excludeCurrency?: Currency
    onCallback: (currency?: Currency) => void
  }
}

export type AllScreens =
  | keyof MainStack
  | keyof OnboardingStack
  | keyof ProfileStack
  | keyof HomeStack
  | keyof BottomSheetStack

export type ScreenProps<ScreenName extends AllScreens> =
  ScreenName extends keyof MainStack
    ? NativeStackScreenProps<MainStack, ScreenName>
    : ScreenName extends keyof OnboardingStack
    ? NativeStackScreenProps<OnboardingStack, ScreenName>
    : ScreenName extends keyof ProfileStack
    ? NativeStackScreenProps<ProfileStack, ScreenName>
    : ScreenName extends keyof HomeStack
    ? NativeStackScreenProps<HomeStack, ScreenName>
    : ScreenName extends keyof BottomSheetStack
    ? NativeStackScreenProps<BottomSheetStack, ScreenName>
    : never

export type Screen = AllScreens

export type AllStacks = MainStack &
  OnboardingStack &
  ProfileStack &
  HomeStack &
  BottomSheetStack

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AllStacks {}
  }
}

export type RouteProp<T extends keyof AllStacks> = NRouteProp<AllStacks, T>
