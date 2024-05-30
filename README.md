# Zap App

This guide will help you get started with setting up and running the project on your local machine. 

## Getting Started

To get started, please ensure that you have Node and Yarn installed on your machine. 

1. Clone the repository to your local machine:
```bash
git clone https://[your-username]@github.com/Zap-Dev-Lab/Zap-Mobile
```
2. Navigate to the project directory:
```bash
cd Zap-Mobile
```
3. Install the project dependencies:
```bash
yarn install
```
4. Run app on iOS
```bash
yarn ios
```
7. Run app on android
```bash
yarn android
```

----

## Useful commands

1. run eslint
```
yarn lint
```

## Navigation

All the screens of the app stays in screens folder. As per the functionality of the Screen, add it to the respective sub-folder. For instance, Signup screen goes inside onboarding folder. For each sub-folder inside screens we create a Navigator inside navigation folder. Look at an existing Navigator in order to create one.
Inside navigation/Router.tsx, we add the respective screen along with the props it requires.
We also need to add the screen to getScreen() function inside navigation/ScreenRegistry.ts file in order for it to be using by its respective Navigator.

### Steps to create a new screen called Login

1. Create the screen named Login.tsx inside screens/onboarding

```
import { AppText } from '@components/text/AppText'
import React, { ReactElement } from 'react'
import { View } from 'react-native'

export default function LoginScreen(): ReactElement {
  return (
    <View>
      <AppText>Login Screen</AppText>
    </View>
  )
}
```

2. Add the Screen to navigation/Router.tsx. If the OnboardingStack doesn't exist, create one. Else add Login to it. In case you are creating one, don't forget to add it to AllScreens and ScreenProps types as well.

```
export type OnboardingStack = {
  Welcome: undefined
  Signup: undefined
  Login: {
    type: 'email' | 'phone'
  }
}
```

3. Add the Screen to getScreen() function inside navigation/ScreenRegistry.ts
```
function getScreen(screenName: Screen): ScreenType {
  switch (screenName) {
    // -------------------- Onboarding Stack --------------------
    case 'OnboardingStack':
      return require('@navigation/OnboardingNavigator').default
    case 'Welcome':
      return require('@screens/onboarding/Welcome').default
    case 'Signup':
      return require('@screens/onboarding/Signup').default
    case 'Login':
      return require('@screens/onboarding/Login').default
  }
}
```


4. Finally, inside navigation folder, if the OnboardingNavigator doesn't exist, create it. Else, add LoginScreen to it.

```
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { OnboardingStack } from './Router'
import { getScreenBuilder } from './ScreenRegistry'

const Stack = createNativeStackNavigator<OnboardingStack>()

const stackScreenOptions = {
  headerShown: false,
}

const getInitialScreen = (): keyof OnboardingStack => {
  return 'Welcome'
}

const OnboardingNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator
      initialRouteName={getInitialScreen()}
      screenOptions={stackScreenOptions}>
      <Stack.Screen name="Welcome" getComponent={getScreenBuilder('Welcome')} />
      <Stack.Screen name="Signup" getComponent={getScreenBuilder('Signup')} />
      // Add below line
      <Stack.Screen name="Login" getComponent={getScreenBuilder('Login')} />
    </Stack.Navigator>
  )
}

export default OnboardingNavigator
```

5. To access screen prop or navigate to another screen, do as follows -

```
export default function LoginScreen({
  navigation,
  route,
}: ScreenProps<'Login'>): ReactElement {

  // Access props
  const { type } = route.params

  // Navigate to another screen
   navigation.navigate('Welcome')

  return (
    <View>
      <AppText>Login Screen</AppText>
    </View>
  )
}
```

## Making API calls

### Query
Query functions get automatically called whenever its screen comes into focus

1. Create Query

```
const { data, isLoading, isFetching } = useQuery({
  queryKey: ['transaction_list'],
  queryFn: () => getTransactionList(order), // The function getTransactionList() gets defined inside api folder
})
```


### Mutation

1. Create mutation

```
const { mutate: mutateLogin, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: login, // The function login() gets defined inside api folder
})
```

2. Call mutation inside onSubmit() function (say)

```
const onSubmit = (): void => {

  const loginArgs: LoginArgs = { // Create LoginArgs type inside types/user.ts
    email: email,
    password: password,
  }

  mutateLogin(loginArgs, {
      onSuccess: function (data) {
        console.log('Data - ', JSON.stringify(data))
      },
      onError: function (error) {
        console.error('Error occurred - ', error.message)
      },
    })
}
```

