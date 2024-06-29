import * as LocalAuthentication from 'expo-local-authentication'

export async function verifyBiometric(): Promise<boolean> {
  const response = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Touch ID or enter password',
    fallbackLabel: 'Enter Password',
  })
  return response.success
}
