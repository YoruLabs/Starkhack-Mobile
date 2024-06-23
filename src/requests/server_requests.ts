import axios, { AxiosError } from 'axios'

// Base URL for the API endpoints
const baseURL = 'http://localhost:4001'

// Signup or Signin request
export async function signupOrSignin(name: string, email: string, publicKeyHex: string, googleAuthToken: string) {
  try {
    const response = await axios.post(`${baseURL}/signup_or_signin`, {
      name,
      email,
      publicKeyHex,
      googleAuthToken
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
    const response = await axios.get(`${baseURL}/get_address`, {
      params: { email },
    })
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    console.error('Error retrieving address:', axiosError.response?.data)
    throw error
  }
}
