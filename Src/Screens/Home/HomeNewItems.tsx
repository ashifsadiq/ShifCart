import { FlatList, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import H1 from '../../Components/ui/H1'
import APIService from '../../Functions/APIResponses';
import TextUI from '../../Components/ui/TextUI';
import theme from '../../config/theme';
import ProductsComponent, { ProductsComponentProps } from '../../Components/ProductsComponent';
import ProductListComponent from '../../Components/ProductListComponent';
type HomeNewItemsProps = {
  hideListHeaderComponent?: boolean;
  style?: ViewStyle;
}
const imageSize = theme.screenWidth / 5
const HomeTopProducts = ({
  hideListHeaderComponent = true,
  style = {},
}: HomeNewItemsProps) => {
  const [productData, setProductData] = useState<ProductsComponentProps[]>([])
  const getData = async () => {
    try {
      const data = await APIService.dashboard.all({ newItems: "" });
      setProductData(data.newItems)
      return;
    } catch (error) {
      return console.error(error);
    }
  }
  const ListHeaderComponent = () => {
    return <H1>New Items</H1>
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <FlatList
      data={productData}
      ListHeaderComponent={hideListHeaderComponent ? null : ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      style={[styles.flatList, style]}
      horizontal
      contentContainerStyle={{
        gap: 10,
        marginBottom: theme.radius * 4,
        marginTop: theme.radius * 2,
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) =>
        <ProductListComponent
          {...item}
        />
      }
    />
  )
}

export default HomeTopProducts

const styles = StyleSheet.create({
  flatList: {
  },
  touchStyle: {
    padding: imageSize / 7,
    borderRadius: "50%"
  }
})