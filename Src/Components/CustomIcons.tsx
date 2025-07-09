import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import theme from '../config/theme';
export function Ionicons({
  name,
  size,
  color,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  return (
    <IoniconsIcon
      name={name}
      size={size || theme.fontSize['text-3xl']}
      color={color || theme.primary}
    />
  );
}
export function AntDesign({
  name,
  size,
  color,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  return (
    <AntDesignIcon name={name} size={size || theme.fontSize['text-3xl']} color={color || theme.primary} />
  );
}
const styles = StyleSheet.create({});
