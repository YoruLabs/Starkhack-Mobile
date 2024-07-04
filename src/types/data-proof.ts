import { STRAVA_ICON } from '@assets/icons'
import { ImageSource } from 'expo-image'

export type ProofCategory = 'Fitness' | 'Education'

export type DataProofItem = {
  category: ProofCategory
  name: string
  description: string
  icon: ImageSource
}

export const proofCategories: ProofCategory[] = ['Fitness', 'Education']

export const proofList: DataProofItem[] = [
  {
    category: 'Fitness',
    name: 'Strava',
    description: 'Community-Powered Motivation',
    icon: STRAVA_ICON,
  },
]

export type RedirectResult = {
  type: 'success' | 'cancel'
  url: string
}
