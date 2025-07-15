import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import SQLiteService from '../../Functions/SQLiteService';
import { fetchProducts } from '../../Functions/APIResponses';
import ProductListComponent from '../../Components/ProductListComponent';
import NavigationComponent from '../../Components/NavigationComponent';
import { useFocusEffect } from '@react-navigation/native';
import UserLayout from '../../Layouts/UserLayout';
import theme from '../../config/theme';
import WishListEmptyComponent from './WishListEmptyComponent';
import WishListLoadingComponent from './WishListLoadingComponent';

export default function WishListScreen() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const getData = async () => {
    setIsLoading(true)
    const getFavorites = await SQLiteService.getFavorites()
    if (Array.isArray(getFavorites)) {
      const products = await fetchProducts(getFavorites.map((item) => item.product_id))
      Array.isArray(products) && setProducts(products)
    }
    setIsLoading(false)
  }
  useFocusEffect(
    useCallback(() => {
      getData();
      return () => {
        setProducts([]);
      };
    }, [])
  );
  return (
    <UserLayout style={{
      flex: 1
    }}>
      <NavigationComponent cantGoBack NavigationTitle={`Wishlist`} />
      <FlatList
        data={products}
        ListEmptyComponent={isLoading ? <WishListLoadingComponent /> : <WishListEmptyComponent />}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => <ProductListComponent item={item} setIsFav={async () => {
          const { id } = item;
          const isFavItem = await SQLiteService.isFavorite(id);
          if (isFavItem) {
            await SQLiteService.toggleFavorite(id);
          } else {
            await SQLiteService.toggleFavorite(id);
          }
          getData()
        }} />}
      />
    </UserLayout>
  );
}

const styles = StyleSheet.create({});
