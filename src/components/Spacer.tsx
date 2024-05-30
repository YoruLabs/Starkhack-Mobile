import React, { useMemo } from 'react'
import { View, ViewProps } from 'react-native'

type Props = ViewProps &
  (
    | {
        horizontal: number | 'stretch'
      }
    | {
        vertical: number | 'stretch'
      }
  )

function SpacerImpl(props: Props): React.ReactElement {
  const style = useMemo(() => {
    const { key, value } =
      'horizontal' in props
        ? ({
            key: 'width',
            value: props.horizontal,
          } as const)
        : ({
            key: 'height',
            value: props.vertical,
          } as const)

    if (typeof value === 'number') return [props.style, { [key]: value }]
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    else if (value === 'stretch') return [props.style, { flex: 1 }]
    else throw new Error(`Invalid ${key} passed! ${value}`)
  }, [props])

  return <View {...props} style={style} />
}

export const Spacer = React.memo(SpacerImpl)
