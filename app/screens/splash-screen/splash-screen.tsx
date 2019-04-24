import { observer } from "mobx-react"
import * as React from "react"
import { Animated, Easing, ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { CircleLogo } from "../../components/circle-logo"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { palette } from "../../theme/palette"

export interface SplashScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.purpleBlue,
}

const CIRCLE_INITIAL_HEIGHT = 0.38
const CIRCLE_FINAL_HEIGHT_PERCENTAGE_LOG_IN_PAGE = 0.07
const CIRCLE_FINAL_HEIGHT_PERCENTAGE_HOME_PAGE = 0.2
const ANIMATION_DEFAULT_SETTINGS = {
  easing: Easing.in(Easing.quad),
  duration: 1500,
}

// @inject("mobxstuff")
@observer
export class SplashScreen extends React.Component<SplashScreenProps, {}> {
  state = {
    circleHeightAnim: new Animated.Value(CIRCLE_INITIAL_HEIGHT),
    circleHeight: CIRCLE_INITIAL_HEIGHT,
    isLoggedIn: false,
  }

  private moveCircleToLogInScreenPosition() {
    Animated.timing(this.state.circleHeightAnim, {
      toValue: CIRCLE_FINAL_HEIGHT_PERCENTAGE_LOG_IN_PAGE,
      ...ANIMATION_DEFAULT_SETTINGS,
    }).start()
  }

  private moveCircleToHomeScreenPosition() {
    Animated.timing(this.state.circleHeightAnim, {
      toValue: CIRCLE_FINAL_HEIGHT_PERCENTAGE_HOME_PAGE,
      ...ANIMATION_DEFAULT_SETTINGS,
    }).start()
  }

  componentDidMount() {
    this.state.circleHeightAnim.addListener(currentValue =>
      this.setState({ circleHeight: currentValue.value }),
    )
    if (this.state.isLoggedIn) {
      this.moveCircleToHomeScreenPosition()
    } else {
      this.moveCircleToLogInScreenPosition()
    }
  }

  render() {
    const circleHeightInPercentage = `${this.state.circleHeight * 100}%`

    return (
      <Screen style={ROOT} preset="fixed">
        <CircleLogo
          viewStyle={{ left: "30%", top: circleHeightInPercentage }}
          outerCircleColor={palette.white}
          innerCircleColor={palette.purpleBlue}
          dimension={150}
        />
      </Screen>
    )
  }
}
