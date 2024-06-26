/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { isEmpty } from '@utils/util'
import axios from 'axios'
import { COM_ZAP_API } from './api-urls'
import { AuthTokens } from 'types/user'

type Options = {
  baseUrl: string
}

const ZapAPI = axios.create({
  baseURL: COM_ZAP_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

ZapAPI.interceptors.response.use((res) => {
  if (res.status > 300) console.log('🪐', `HTTP ${res.status}`)

  if (res.status === 500) console.log('🐞', `URL ${res.request.url}`)

  if (res.data) {
    const requestUrl: string = res.request?._url
    // If response DOESN'T come inside a data object
    if (isEmpty(res.data.data)) return res.data

    // If the data is NOT paginated
    if (!requestUrl.includes('page')) return res.data.data

    // If the data is paginated
    return {
      data: res.data.data,
      currentPage: res.data.meta?.page ?? 1,
      totalPages: res.data.meta?.last ?? 1,
    }
  }
  return res
})

// Log requests
if (__DEV__) {
  ZapAPI.interceptors.request.use((config) => {
    console.log(
      '🪐',
      `Request: ${config.method?.toUpperCase()} ${config.url}, 
      params: ${JSON.stringify(config.params)}, 
      data: ${JSON.stringify(config.data)}`,
    )
    return config
  })
}

export function setHeaders(authToken: AuthTokens): void {
  console.log('👤', 'Set token as Authorization header')
  ZapAPI.defaults.headers.common.Authorization = 'Bearer ' + authToken.apiToken
}

export function setBaseUrl({ baseUrl }: Options): void {
  ZapAPI.defaults.baseURL = baseUrl
}

export { ZapAPI }
