import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import theme from '../config/theme';
type IconProps = {
  name: string;
  size?: number;
  color?: string;
}
export function Ionicons({
  name,
  size,
  color,
}: IconProps) {
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
}: IconProps) {
  return (
    <AntDesignIcon name={name} size={size || theme.fontSize['text-3xl']} color={color || theme.primary} />
  );
}
export function MaterialCommunity({
  name,
  size,
  color,
}: IconProps) {
  return (
    <MaterialCommunityIcon name={name} size={size || theme.fontSize['text-3xl']} color={color || theme.primary} />
  );
}
export function Material({
  name,
  size,
  color,
}: IconProps) {
  <MaterialIcons name={name} size={size || theme.fontSize['text-3xl']} color={color || theme.primary} />
}
export function Oct({
  name,
  size,
  color,
}: IconProps) {
  <Octicons name={name} size={size || theme.fontSize['text-3xl']} color={color || theme.primary} />
}
const styles = StyleSheet.create({});
