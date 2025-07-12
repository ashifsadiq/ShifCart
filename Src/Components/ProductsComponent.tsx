import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import theme from '../config/theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextUI from './ui/TextUI';

type RootStackParamList = {
  ProductDetails: { id: string };
  // add other routes here if needed
};

type ProductsComponentProps = {
  id: number;
  title: string;
  image: string;
  slug: string;
  price: number;
  mrp: number;
  discount?: number;
  customStyle?: ViewStyle;
};
export default function ProductsComponent({
  id,
  title,
  image,
  slug,
  price,
  mrp,
  discount,
  customStyle,
}: ProductsComponentProps) {
  const isDarkMode = useColorScheme() != 'dark';
  const backgroundColor = !isDarkMode ? theme.dark.card : theme.card;
  const fontColor = isDarkMode ? theme.muted : theme.dark.muted;
  const screenHeight = Dimensions.get('window').height;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { id: id.toString(), slug: slug })}
      activeOpacity={0.8}
      style={[
        styles.container,
        { backgroundColor: backgroundColor, ...customStyle },
      ]}
    >
      <View style={styles.row}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.details}>
          <TextUI numberOfLines={2}>{title}</TextUI>
          <TextUI style={styles.price}>₹{price}</TextUI>
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <TextUI style={styles.strike}>₹{mrp}</TextUI>
              {discount && (
                <TextUI style={styles.discount}>{discount}% Off</TextUI>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.radius * 2,
    borderRadius: theme.radius * 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    columnGap: theme.radius * 1.5,
    alignItems: 'center',
  },
  image: {
    width: '40%',
    aspectRatio: 1,
    borderRadius: theme.radius * 2,
  },
  details: {
    flex: 1, // remaining 60%
    rowGap: theme.radius,
    height:"100%",
    justifyContent:"space-around"
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.radius,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  price: {
    fontSize: theme.fontSize['text-xl'],
    fontWeight: 'bold',
  },
  discount: {
    backgroundColor: '#ADEBB3',
    color: '#0F4D0F',
    paddingHorizontal: theme.radius * 1.5,
    paddingVertical: theme.radius,
    borderRadius: theme.radius * 2,
  },
});

