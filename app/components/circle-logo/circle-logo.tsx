import * as React from "react"
import { View } from "react-native"
import { Circle, Svg } from "react-native-svg"
import { CircleLogoProps } from "./circle-logo.props"

/**
 * Circle Component representing application logo
 *
 */
export function CircleLogo(props: CircleLogoProps) {
  // grab the props
  const { outerCircleColor, innerCircleColor, dimension } = props
  const circleCenter = dimension / 2.0
  const outerCircleRadius = dimension / 2.0
  const innerCircleRadius = outerCircleRadius - 18 // 18 is the distance between any point in the edge of the outter circle and the edge of the inner circle
  const viewPortSetting = `0 0 ${dimension.toString()} ${dimension.toString()}`

  return (
    <View>
      <Svg height={dimension.toString()} width={dimension.toString()} viewBox={viewPortSetting}>
        <Circle
          cx={circleCenter.toString()}
          cy={circleCenter.toString()}
          r={outerCircleRadius.toString()}
          fill={outerCircleColor}
        />
        <Circle
          cx={circleCenter.toString()}
          cy={circleCenter.toString()}
          r={innerCircleRadius.toString()}
          fill={innerCircleColor}
        />
      </Svg>
    </View>
  )
}
