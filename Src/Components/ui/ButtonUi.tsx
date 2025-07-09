import {
  Pressable,
  PressableProps,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import theme from '../../config/theme';
import TextUI from './TextUI';
type ButtonUiType = {
  children?: React.ReactNode;
  pressableProps?: TouchableOpacityProps;
  contentContainerStyle?: ViewStyle;
  childrenComponent?: React.ReactNode;
  textStyle?: TextStyle;
};

const spaces = 14;
const ButtonUi = ({
  children,
  pressableProps,
  contentContainerStyle = {},
  childrenComponent,
  textStyle = {},
}: ButtonUiType) => {
  return (
    <TouchableOpacity
      style={[styles.containerStyle, contentContainerStyle]}
      {...pressableProps}>
      {childrenComponent ? (
        childrenComponent
      ) : (
        <TextUI
          style={[
            {
              color: theme.accent,
              fontWeight: '600',
            },
            textStyle,
          ]}>
          {children}
        </TextUI>
      )}
    </TouchableOpacity>
  );
};

export default ButtonUi;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.primary,
    paddingVertical: spaces,
    paddingHorizontal: spaces * 2,
    borderRadius: spaces,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
