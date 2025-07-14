import {
  StyleSheet,
  Text,
  useColorScheme,
  TextStyle,
  TextProps,
} from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import theme from '../../config/theme';

type H2Props = TextProps & {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  foreground?: boolean;
};

const H2 = ({ children, style, foreground = false, ...rest }: H2Props) => {
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
        { color: textColor() },
        ...(Array.isArray(style) ? style : style ? [style] : []),
      ]}
      ellipsizeMode="tail" // Add this line
      {...rest}>
      {children}
    </Text>
  );
};

export default H2;

const styles = StyleSheet.create({
  textStyles: {
    fontSize: theme.fontSize['text-xl'],
    fontWeight: 'bold',
  },
});