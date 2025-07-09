import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  TextStyle,
  TextProps,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import theme from '../../config/theme';

type TextUIProps = TextProps & {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  foreground?: boolean;
  rest?: any;
};

const TextUI = ({
  children,
  style,
  foreground = false,
  ...rest
}: TextUIProps) => {
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

export default TextUI;

const styles = StyleSheet.create({
  textStyles: {
    fontSize: theme.fontSize['text-base'],
    fontWeight: '400',
    lineHeight: 20,
  },
});
