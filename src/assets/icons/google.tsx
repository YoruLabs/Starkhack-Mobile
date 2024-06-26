import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from '../icons'
/* SVGR has dropped some elements not supported by react-native-svg: style */
function GoogleIcon(props: IconProps) {
    return (
        <Svg
          id="Capa_1"
          viewBox="0 0 40 40"
          // @ts-ignore
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          {...props}
        >
          <Path
            d="M32 20.294c0-.826-.08-1.68-.214-2.48H20.24v4.72h6.612a5.563 5.563 0 01-2.453 3.708l3.947 3.068c2.32-2.161 3.653-5.309 3.653-9.015"
            fill="#4280ef"
          />
          <Path
            d="M20.24 32.24c3.308 0 6.08-1.094 8.107-2.96L24.4 26.24c-1.094.747-2.507 1.174-4.16 1.174-3.2 0-5.894-2.16-6.88-5.04l-4.054 3.12a12.237 12.237 0 0010.933 6.746"
            fill="#34a353"
          />
          <Path
            d="M13.36 22.348a7.438 7.438 0 010-4.694l-4.054-3.147a12.25 12.25 0 000 10.987z"
            fill="#f6b704"
          />
          <Path
            d="M20.24 12.614a6.675 6.675 0 014.694 1.84l3.494-3.52a11.775 11.775 0 00-8.188-3.172 12.225 12.225 0 00-10.933 6.746l4.054 3.147c.986-2.906 3.68-5.04 6.88-5.04"
            fill="#e54335"
          />
        </Svg>
      )
}

export default GoogleIcon
