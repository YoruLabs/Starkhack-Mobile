import { ShowAlert } from '@components/ShowAlert'
import type { ErrorResponse } from 'types/error'
import { isEmpty } from './util'
import Toast from 'react-native-toast-message'

export function showError(error?: unknown, fallbackMessage?: string): void {
  if (hasErrorMessage(error)) {
    const message = (error as ErrorResponse).message ?? ''
    if (message.length < 48) {
      Toast.show({
        type: 'info',
        text1: message,
        text1Style: { fontSize: 16 },
        position: 'bottom',
      })
    } else {
      ShowAlert({ title: 'Error', description: message })
    }
  } else {
    if (fallbackMessage !== undefined) {
      Toast.show({
        type: 'info',
        text1: fallbackMessage,
        text1Style: { fontSize: 16 },
        position: 'bottom',
      })
    }
  }
}

export function hasErrorMessage(err: unknown): boolean {
  const error = err as ErrorResponse
  return !isEmpty(error) && !isEmpty(error.message)
}
