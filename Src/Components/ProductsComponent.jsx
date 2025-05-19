import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import React from 'react';
import theme from '../config/theme';
import { useNavigation } from '@react-navigation/native';

export default function ProductsComponent({
  id,
  title,
  image,
  price,
  discount,
  customStyle = {},
}) {
  const isDarkMode = false //useColorScheme() != 'dark';
  const backgroundColor = isDarkMode ? theme.dark.card : theme.card;
  const fontColor = isDarkMode ? theme.muted : theme.dark.muted;
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { id })} activeOpacity={0.8} style={[styles.container, { backgroundColor: backgroundColor, ...customStyle }]}>
      <Image
        source={{ uri: image }}
        style={[styles.image, {
          height: screenHeight * 0.25,
          objectFit: "contain",
        }]}
      />
      <Text numberOfLines={2} style={[{ ...styles.title }, styles.title]}>{title}</Text>
      <View style={styles.priceSection}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: theme.radius,
        }} >
          <Text numberOfLines={2} style={[{ textDecorationLine: "line-through", fontSize: theme.fontSize['text-sm'] }]}>₹{price + ((price / 100) * 3)}</Text>
          <Text numberOfLines={2} style={[{ ...styles.price }]}>₹{price}.00</Text>
        </View>
        {discount && <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={styles.discount} >{discount} % Off</Text>
        </View>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.radius * 2,
    borderRadius: theme.radius * 2,
  },
  title: {
    fontSize: theme.fontSize['xs'],
    marginBottom: theme.radius,
  },
  description: {
    fontSize: theme.fontSize.base,
  },
  discount: {
    backgroundColor: '#ADEBB3',
    color: "#0F4D0F",
    paddingHorizontal: theme.radius * 1.5,
    paddingVertical: theme.radius,
    borderRadius: theme.radius * 2,
  },
  image: {
    width: '100%',
    borderRadius: theme.radius * 2,
  },
  price: {
    fontSize: theme.fontSize['text-lg'],
    fontWeight: 'bold',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
