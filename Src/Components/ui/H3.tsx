import {
  StyleSheet,
  Text,
  useColorScheme,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import theme from '../../config/theme';

type H3Props = {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[]; // use TextStyle instead of AbsoluteFillStyle
  foreground?: boolean;
  rest?: any;
};

const H3 = ({children, style, foreground = false, ...rest}: H3Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = () => {
    if (foreground) {
      return !isDarkMode ? Colors.white : Colors.black;
    }
    return isDarkMode ? Colors.white : Colors.black;
  };
  return (
    <Text
      style={[
        styles.textStyles,
        {color: textColor()},
        ...(Array.isArray(style) ? style : style ? [style] : []),
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

export default H3;

const styles = StyleSheet.create({
  textStyles: {
    fontSize: theme.fontSize['text-lg'],
  },
});
