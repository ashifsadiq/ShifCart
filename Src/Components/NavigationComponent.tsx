import {
  Dimensions,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import theme from '../config/theme';
import {Ionicons} from './CustomIcons';
import {useNavigation} from '@react-navigation/native';
import H1 from './ui/H1';

export default function NavigationComponent({
  cantGoBack = false,
  NavigationTitle = '',
  contentContainerStyle = {},
}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.component, contentContainerStyle]}>
      {!cantGoBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button]}>
          <Ionicons name="chevron-back" size={theme.fontSize['text-3xl']} />
        </TouchableOpacity>
      )}
      {NavigationTitle && <H1>{NavigationTitle}</H1>}
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    flexDirection: 'row',
    minHeight: theme.fontSize['text-lg'] * 3,
    alignItems: 'center',
    paddingHorizontal: theme.fontSize['text-lg'],
  },
  marginHorizontal: {},
  button: {},
  navigationTitle: {
    fontWeight: '600',
  },
});
