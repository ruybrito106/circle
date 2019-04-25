import { createStackNavigator } from "react-navigation"
import { SplashScreen } from "../screens/splash-screen/splash-screen"
import { ExampleNavigator } from "./example-navigator"

export const RootNavigator = createStackNavigator(
  {
    splashScreen: { screen: SplashScreen },
    exampleStack: { screen: ExampleNavigator },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
    initialRouteName: "splashScreen",
  },
)
