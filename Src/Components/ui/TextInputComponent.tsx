import React, {memo} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import theme from '../../config/theme';
import TextUI from './TextUI';
import ButtonUi from './ButtonUi';

type TextInputComponentType = {
  textInputProps?: TextInputProps;
  label?: string;
  contentContainerStyle?: ViewStyle;
  rightIcon?: React.ReactNode;
  onPressRightIcon?: () => void;
  rightIconComponentStyle?: ViewStyle;
};

const spaces = 14;

const TextInputComponent = ({
  textInputProps,
  label,
  contentContainerStyle,
  rightIcon,
  onPressRightIcon,
  rightIconComponentStyle,
}: TextInputComponentType) => {
  const isDarkMode = useColorScheme() === 'dark';

  const textColor = () => {
    if (!textInputProps?.style || !('color' in textInputProps.style)) {
      return isDarkMode ? Colors.white : Colors.black;
    }
    return (textInputProps?.style as any).color;
  };

  return (
    <View style={[styles.contentContainerStyle, contentContainerStyle]}>
      {label && <TextUI style={[styles.label]}>{label}</TextUI>}
      <View
        style={{
          borderRadius: spaces,
          backgroundColor: isDarkMode ? theme.dark.border : theme.border,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={[
            styles.inputStyle,
            {
              color: textColor(),
            },
            textInputProps?.style,
          ]}
          {...textInputProps}
        />
        {rightIcon && (
          <ButtonUi
            contentContainerStyle={{
              ...rightIconComponentStyle,
            }}
            childrenComponent={rightIcon}
            pressableProps={{

              onPress: () => {
                if (onPressRightIcon) {
                  onPressRightIcon();
                }
              },
            }}
          />
        )}
      </View>
    </View>
  );
};

export default memo(TextInputComponent);

const styles = StyleSheet.create({
  contentContainerStyle: {},
  inputStyle: {
    flex: 1,
    paddingVertical: spaces,
    paddingHorizontal: spaces,
    fontSize: theme.fontSize['text-xl'],
  },
  label: {
    marginLeft: spaces / 2,
    marginBottom: spaces * 0.5,
  },
  rightIconButtonStyle: {},
});
