import { Alert } from "react-native";
import screenNames from "../config/screenNames";

export function getRandomInt(min, max) {
  min = Math.ceil(min);   // Round up min
  max = Math.floor(max);  // Round down max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const handleUnauthenticatedError = (navigation) => {
  Alert.alert('Oops!', 'Please Login to Proceed', [
    {
      text: 'Not Now!',
    },
    {
      text: 'Login',
      onPress: () => {
        navigation.navigate(screenNames.LoginScreen);
      },
      style: 'destructive',
    },
  ]);
};
