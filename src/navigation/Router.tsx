import type { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MainStack = {
  OnboardingStack: NavigatorScreenParams<OnboardingStack>;
  ProfileStack: NavigatorScreenParams<ProfileStack>;
};

export type OnboardingStack = {
  Welcome: undefined;
  Signup: undefined;
};

export type ProfileStack = {
  Profile: undefined;
};

export type AllScreens =
  | keyof MainStack
  | keyof OnboardingStack
  | keyof ProfileStack

export type ScreenProps<ScreenName extends AllScreens> =
  ScreenName extends keyof MainStack
    ? NativeStackScreenProps<MainStack, ScreenName>
    : ScreenName extends keyof OnboardingStack
    ? NativeStackScreenProps<OnboardingStack, ScreenName>
    : ScreenName extends keyof ProfileStack
    ? NativeStackScreenProps<ProfileStack, ScreenName>
    : never;

export type Screen = AllScreens;
