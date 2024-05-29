const TEXT_SIZES = {
  micro: 10,
  tiny: 12,
  'very-small': 14,
  small: 16,
  normal: 18,
  large: 20,
  'extra-large': 22,
  'very-large': 24,
  'sub-heading': 34,
  header: 40,
  'ultra-large': 64,
} as const

export type TextSize = keyof typeof TEXT_SIZES

export type FontVariant = 'regular' | 'medium' | 'bold'
export type FontName = 'SFProRounded'

export function getFontSize(size: TextSize): (typeof TEXT_SIZES)[typeof size] {
  return TEXT_SIZES[size]
}

export function getFontName(size: TextSize): FontName {
  switch (size) {
    case 'micro':
    case 'tiny':
    case 'very-small':
    case 'small':
    case 'normal':
    case 'large':
    case 'extra-large':
    case 'very-large':
    case 'sub-heading':
    case 'header':
    case 'ultra-large':
      return 'SFProRounded'
  }
  // @ts-expect-error should be unreachable.
  throw new Error(`Invalid font size supplied: ${size}!`)
}

export function getFontVariant(
  font: FontName,
  type: FontVariant,
): `${typeof font}-${string}` {
  switch (font) {
    case 'SFProRounded':
      switch (type) {
        case 'regular':
          return 'SFProRounded-Regular'
        case 'medium':
          return 'SFProRounded-Medium'
        case 'bold':
          return 'SFProRounded-Bold'
      }
      // @ts-expect-error should be unreachable.
      throw new Error(`Invalid font variant supplied: ${type}!`)
  }
  // @ts-expect-error should be unreachable.
  throw new Error(`Invalid font name supplied: ${font}!`)
}
