import React from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle, useColorScheme } from 'react-native';
import theme from '../config/theme';
type ImageGridType = {
  images: string[];
  isTwice?: Boolean;
  style?: ViewStyle,
  imageStyle?: ImageStyle
}
const ImageGrid = ({ images = [], isTwice = false, style = {}, imageStyle }: ImageGridType) => {
  const isDarkMode = useColorScheme() === 'dark';
  const displayImages = images.slice(0, 4); // Only show top 4

  const renderImage = (uri: string, index: number) => (
    <Image
      key={index}
      source={{ uri }}
      style={[
        styles.image,
        {
          borderColor: isDarkMode ? theme.dark.background : theme.background,
          backgroundColor: isDarkMode ? theme.background : 'transparent',
        },
        getImageStyle(displayImages.length, index),
        // imageStyle
      ]}
      resizeMode="contain"
    />
  );

  return <View style={[styles.container, style]}>{displayImages.map(renderImage)}</View>;
};

const getImageStyle = (count: number, index: number) => {
  switch (count) {
    case 1:
      return { width: '98%', height: 200 } as const;
    case 2:
      return { width: '45.5%', height: 200 } as const;
    case 3:
      return {
        width: index === 0 ? '100%' : '48%',
        height: index === 0 ? 100 : 100,
      } as const;
    case 4:
    default:
      return { width: '48%', height: 100 } as const;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 16,
    overflow: 'hidden',
    rowGap: "2%",
    columnGap: "2%",
    justifyContent:"space-between"
  },
  image: {
    borderWidth: 1,
    borderRadius: 16,
  },
});

export default ImageGrid;
