import { MMKV } from 'react-native-mmkv'
import { createJSONStorage } from 'jotai/utils'

// Non-encrypted
export const storage = new MMKV()

storage.addOnValueChangedListener((key) => {
  console.log('📦', `MMKV: "${key}" changed!`)
})

export const setItem = (key: string, newValue: string | number | boolean): void => {
  storage.set(key, newValue)
}

export const removeItem = (key: string): void => {
  storage.delete(key)
}

// @ts-ignore
export const storageForString = createJSONStorage<string>(() => {
  return {
    getItem: (key: string) => {
      if (!storage.contains(key)) return

      return storage.getString(key)
    },
    setItem: setItem,
    removeItem: removeItem,
  }
})

// @ts-ignore
export const storageForNumber = createJSONStorage<number>(() => {
  return {
    getItem: (key: string) => {
      if (!storage.contains(key)) return

      return storage.getNumber(key)
    },
    setItem: setItem,
    removeItem: removeItem,
  }
})

// @ts-ignore
export const storageForBoolean = createJSONStorage<boolean>(() => {
  return {
    getItem: (key: string) => {
      if (!storage.contains(key)) return

      return storage.getBoolean(key)
    },
    setItem: setItem,
    removeItem: removeItem,
  }
})

export const storageForObject = createJSONStorage<object>(() => {
  return {
    getItem: (key: string) => {
      if (!storage.contains(key)) return
      const value = storage.getString(key)

      return value != null ? JSON.parse(value) : undefined
    },
    setItem: (key: string, newValue: string | number | boolean): void => {
      storage.set(key, JSON.stringify(newValue))
    },
    removeItem: removeItem,
  }
})
