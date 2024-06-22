import { BACKEND_ENDPOINT } from '@utils/constants/SignerConstants'
import axios, { AxiosError } from 'axios'

// Base URL for the API endpoints

// Signup or Signin request
export async function signupOrSignin(
  name: string,
  email: string,
  enclavePublicKey: string,
) {
  try {
    const response = await axios.post(`${BACKEND_ENDPOINT}/signup_or_signin`, {
      name,
      email,
      enclavePublicKey,
    })
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    console.error('Error during signup or signin:', axiosError.response?.data)
    throw error
  }
}

// Get Address request
export async function getAddress(email: string) {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/get_address`, {
      params: { email },
    })
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    console.error('Error retrieving address:', axiosError.response?.data)
    throw error
  }
}

// Send Transaction request
export async function sendTransaction(email: string) {
  try {
    const response = await axios.post(
      `${BACKEND_ENDPOINT}/send_transaction`,
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    console.error('Error sending transaction:', axiosError.response?.data)
    throw error
  }
}
