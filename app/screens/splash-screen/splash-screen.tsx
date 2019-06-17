import { inject, observer } from "mobx-react"
import * as React from "react"
import { View, ViewStyle } from "react-native"
import { GoogleSignin, GoogleSigninButton, statusCodes } from "react-native-google-signin"
import { NavigationScreenProps } from "react-navigation"
import { CircleLogo } from "../../components/circle-logo"
import { Screen } from "../../components/screen"
import { CircleUserSnapshot } from "../../models/circle-user"
import { RootStore } from "../../models/root-store"
import { ScopesNeeded } from "../../services/google/sheets-api"
import { color } from "../../theme"
import { palette } from "../../theme/palette"

export interface SplashScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.purpleBlue,
}

const CIRCLE_INITIAL_HEIGHT = 0.3
const SIGN_IN_BUTTON_HEIGHT = CIRCLE_INITIAL_HEIGHT + 0.05

@observer
@inject("rootStore")
export class SplashScreen extends React.Component<SplashScreenProps, {}> {
  state = {
    isSigninInProgress: false,
  }

  private get store(): RootStore {
    return this.props.rootStore!
  }

  componentDidMount() {
    if (!this.store.circleUser) {
      GoogleSignin.configure({
        scopes: ScopesNeeded,
      })
    }
  }

  render() {
    const circleHeight = `${CIRCLE_INITIAL_HEIGHT * 100}%`
    const buttonHeight = `${SIGN_IN_BUTTON_HEIGHT * 100}%`

    return (
      <Screen style={ROOT} preset="fixed">
        <View style={{ height: "100%" }}>
          <CircleLogo
            viewStyle={{ left: "30%", top: circleHeight }}
            outerCircleColor={palette.white}
            innerCircleColor={palette.purpleBlue}
            dimension={150}
          />
          <GoogleSigninButton
            style={{ width: 230, height: 48, left: "20%", top: buttonHeight }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this.signIn}
            disabled={this.state.isSigninInProgress}
          />
        </View>
      </Screen>
    )
  }

  private signIn = async () => {
    try {
      this.setState({ isSigninInProgress: true })
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const tokens = await GoogleSignin.getTokens()
      const circleUser: CircleUserSnapshot = {
        name: userInfo.user.name,
        photo: userInfo.user.photo,
      }
      this.store.setCircleUser(circleUser, tokens.accessToken)
    } catch (error) {
      console.log(error)
      switch (error.code) {
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // If google service is not available, whatever
          break
        case statusCodes.SIGN_IN_CANCELLED:
          // User cancelled login, nothing to do
          break
        case statusCodes.SIGN_IN_REQUIRED:
          // Called getTokens wtihout signing in
          break
      }
    } finally {
      this.setState({ isSigninInProgress: false })
    }
  }
}
