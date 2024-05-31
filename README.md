# Zap App

This guide will help you get started with setting up and running the project on your local machine.

</br>

## Getting Started

To get started, please ensure that you have Node and Yarn installed on your machine. 

</br>

1. Clone the repository to your local machine:

```
// Make sure to update [your-username] with your github username

git clone https://[your-username]@github.com/Zap-Dev-Lab/Zap-Mobile
```
</br>

2. Navigate to the project directory:
```
cd Zap-Mobile
```
</br>

3. Install the project dependencies:
```
yarn install
```
</br>

4. Run app on iOS
```
yarn ios
```
</br>

5. Run app on android
```
yarn android
```
</br>

----

</br>

## Useful commands

1. Run eslint to view project warnings and errors
```
yarn lint
```

----

</br>

## Navigation

All the screens of the app stays in _screens_ folder. As per the functionality of the Screen, add it to the respective sub-folder. For instance, _Login screen_ goes inside _onboarding_ folder. For each sub-folder inside _screens_ we create a _Navigator_ inside _navigation_ folder. Look at an existing Navigator in order to create one.
<br/>
Inside _navigation/Router.tsx_, we add the respective screen along with the props it requires.
<br/>
We also need to add our screen to _getScreen()_ function inside _navigation/ScreenRegistry.ts_ file in order for it to be used by its respective Navigator.

</br>

### Steps to create a new screen called Login

</br>

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
</br>

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
</br>

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
</br>

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
</br>

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

----

</br>

## Making API calls

### Query
Query functions get automatically called whenever its screen comes into focus

</br>

1. Create Query

```
const { data, isLoading, isFetching } = useQuery({
  queryKey: ['transaction_list'],
  queryFn: () => getTransactionList(order), // The function getTransactionList() gets defined inside api folder
})
```


### Mutation

</br>

1. Create mutation

```
const { mutate: mutateLogin, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: login, // The function login() gets defined inside api folder
})
```

</br>

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

