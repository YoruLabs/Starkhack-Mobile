import { ShowAlert } from '@components/ShowAlert'
import type { ErrorResponse } from 'types/error'
import Toast from 'react-native-root-toast'
import { isEmpty } from './util'

export function showError(error?: unknown, fallbackMessage?: string): void {
  if (hasErrorMessage(error)) {
    const message = (error as ErrorResponse).message ?? ''
    if (message.length < 48) {
      Toast.show(message, { duration: Toast.durations.LONG })
    } else {
      ShowAlert({ title: 'Error', description: message })
    }
  } else {
    if (fallbackMessage !== undefined) {
      Toast.show(fallbackMessage)
    }
  }
}

export function hasErrorMessage(err: unknown): boolean {
  const error = err as ErrorResponse
  return !isEmpty(error) && !isEmpty(error.message)
}
