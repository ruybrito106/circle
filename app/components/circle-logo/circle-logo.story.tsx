import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { CircleLogo } from "."
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { palette } from "../../theme/palette"
import { CircleLogoProps } from "./circle-logo.props"

const primaryStyle: CircleLogoProps = {
  outerCircleColor: palette.purpleBlue,
  innerCircleColor: palette.white,
  dimension: 150,
}

const secondaryStyle: CircleLogoProps = {
  outerCircleColor: palette.white,
  innerCircleColor: palette.purpleBlue,
  dimension: 150,
}

storiesOf("Circle", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase
        noBackground
        text="Primary"
        usage="Outer circle purple with inner circle white 150x150"
      >
        <CircleLogo {...primaryStyle} />
      </UseCase>
      <UseCase
        noBackground
        text="Secondary"
        usage="Inner circle purple with outer circle white 150x150"
      >
        <CircleLogo {...secondaryStyle} />
      </UseCase>
    </Story>
  ))
