import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  useColorScheme,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import theme from '../config/theme';
type UserLayoutType = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[]; // use TextStyle instead of AbsoluteFillStyle
  rest?: ViewProps;
};
export default function UserLayout({children, style, rest}: UserLayoutType) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? theme.dark.muted : theme.muted,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
