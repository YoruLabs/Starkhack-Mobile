import { Alert } from 'react-native'

type Props = {
  title: string
  description?: string
  leftButtonTitle?: string
  rightButtonTitle?: string
  leftButtonPress?: () => void
  rightButtonPress?: () => void
}

export const ShowAlert = ({
  title,
  description = '',
  leftButtonTitle = 'Cancel',
  rightButtonTitle = 'Ok',
  leftButtonPress,
  rightButtonPress,
}: Props): void => {
  Alert.alert(
    title,
    description,
    [
      {
        style: 'cancel',
        text: leftButtonTitle,
        onPress: leftButtonPress ?? undefined,
      },
      {
        style: 'destructive',
        text: rightButtonTitle,
        onPress: rightButtonPress ?? undefined,
      },
    ],
    {
      cancelable: true,
    },
  )
}
