export type Platform = {
  name: PlatformName
  icon: string
}

export type PlatformName = 'Revolut' | 'Venmo' | 'PayPal'

export const platforms: Record<PlatformName, Platform> = {
  Revolut: {
    name: 'Revolut',
    icon: 'revolut',
  },
  Venmo: {
    name: 'Venmo',
    icon: 'venmo',
  },
  PayPal: {
    name: 'PayPal',
    icon: 'paypal',
  },
}

export const platformNames = Object.keys(platforms) as PlatformName[]
