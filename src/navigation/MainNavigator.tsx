import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { ReactElement } from "react";
import { MainStack } from "./Router";
import { getScreenBuilder } from "./ScreenRegistry";

const Stack = createNativeStackNavigator<MainStack>();

const stackScreenOptions = {
  headerShown: false,
  headerBackTitle: "",
  headerTintColor: "#000",
};

export const MainNavigator = (): ReactElement => {
  // TODO: Manage Login here
  // const isLoggedIn = useAtomValue(Atoms.LoggedIn)
  const isLoggedIn = false;

  const getInitialScreen = (): keyof MainStack => {
    if (isLoggedIn) {
      return "ProfileStack";
    } else {
      return "OnboardingStack";
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialScreen()}
      screenOptions={stackScreenOptions}
    >
      <Stack.Group>
        <Stack.Screen
          name="OnboardingStack"
          getComponent={getScreenBuilder("OnboardingStack")}
        />
        <Stack.Screen
          name="ProfileStack"
          getComponent={getScreenBuilder("ProfileStack")}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
