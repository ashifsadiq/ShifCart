import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import theme from '../../config/theme';
const carousel = theme.screenWidth;

const HomeCarousel = () => {
  // theme.screenWidth
  const [data, setData] = useState([...Array.from({ length: 10 }, (_, index) => `https://picsum.photos/1200/627.jpg?random=${index}`)])
  const progress = useSharedValue(0);
  const RenderItem = ({ item, index, animationValue }) => <Image
    source={{
      uri: item
    }}
    style={styles.image}
  />
  return (
    <View style={styles.container}>
      <Carousel
        autoPlayInterval={2000}
        autoPlay={true}
        data={data}
        height={"auto"}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={carousel}
        style={{
          width: carousel,
          height: carousel / 2
        }}
        mode="horizontal-stack"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={RenderItem}
      />
    </View>
  )
}

export default HomeCarousel

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: theme.radius * 2,
  },
  image: {
    width: "95%",
    height: carousel / 2,
    resizeMode: "contain",
    borderRadius: theme.fontSize['text-xl']
  }
})