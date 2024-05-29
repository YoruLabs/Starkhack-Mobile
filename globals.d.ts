declare module 'react-native-svg' {
  import { SvgProps as Original } from 'react-native-svg'
  interface SvgProps extends Original {
    xmlns?: string
    xmlnsXlink?: string
  }
}
