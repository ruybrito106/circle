import { ViewStyle } from "react-native"

export interface CircleLogoProps {
  /** Background color of outer circle */
  outerCircleColor: string

  /** Background color for inner circle */
  innerCircleColor: string

  /** Width and height of circle's view */
  dimension: number

  /** View style */
  viewStyle?: ViewStyle
}
