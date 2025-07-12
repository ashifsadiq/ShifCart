import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageGrid = ({ images = [] }) => {
  const displayImages = images.slice(0, 4);

  const renderImage = (uri, index) => (
    <Image
      key={index}
      source={{ uri }}
      resizeMode="cover"
      style={[styles.image, getImageStyle(displayImages.length, index)]}
    />
  );

  return <View style={styles.container}>{displayImages.map(renderImage)}</View>;
};

const getImageStyle = (count, index) => {
  switch (count) {
    case 1:
      return { width: '100%', height: 200 };
    case 2:
      return { width: '49%', height: 200, margin: '0.5%' };
    case 3:
      if (index === 0) return { width: '100%', height: 200, marginBottom: 5 };
      return { width: '49%', height: 100, margin: '0.5%' };
    case 4:
    default:
      return { width: '49%', height: 100, margin: '0.5%' };
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 12,
  },
});

export default ImageGrid;
