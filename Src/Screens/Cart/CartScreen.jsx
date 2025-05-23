import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import SQLiteService from '../../Functions/SQLiteService';
import { fetchProducts } from '../../Functions/APIResponses';
import { useFocusEffect } from '@react-navigation/native';
import UserLayout from '../../Layouts/UserLayout';
import NavigationComponent from '../../Components/NavigationComponent';
import WishListLoadingComponent from '../WishList/WishListLoadingComponent';
import WishListEmptyComponent from '../WishList/WishListEmptyComponent';
import ProductListComponent from '../../Components/ProductListComponent';
import theme from '../../config/theme';

export default function CartScreen() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartQty, setCartQty] = useState([]);
  const getData = async () => {
    setIsLoading(true);
    const getCartItems = await SQLiteService.getCartItems();
    setCartQty(getCartItems.map(item => item.product_qty));
    if (Array.isArray(getCartItems)) {
      const products = await fetchProducts(
        getCartItems.map(item => item.product_id),
      );
      Array.isArray(products) && setProducts([...products]);
    }
    setIsLoading(false);
  };
  const addToCart = async (id) => {
    const item = await SQLiteService.addToCart(id);
    getData()
  };
  const removeFromCart = async (id) => {
    const item = await SQLiteService.removeFromCart(id); getData()
  };
  useFocusEffect(
    useCallback(() => {
      getData();
      return () => {
        setProducts([]);
      };
    }, []),
  );
  return (
    <UserLayout
      style={{
        flex: 1,
      }}>
      <NavigationComponent cantGoBack NavigationTitle={`CartItems`} />
      <FlatList
        data={products}
        ListEmptyComponent={
          isLoading ? <WishListLoadingComponent /> : <WishListEmptyComponent />
        }
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <ProductListComponent
            item={item}
            isFav={item.isFav}
            setIsFav={async () => {
              const { id } = item;
              const isFavItem = await SQLiteService.isFavorite(id);
              if (isFavItem) {
                await SQLiteService.toggleFavorite(id);
              } else {
                await SQLiteService.toggleFavorite(id);
              }
              getData();
            }}
            qty={cartQty[index]}
            addToCart={() => addToCart(item.id)}
            removeFromCart={() => removeFromCart(item.id)}
          />
        )}
      />
      {Array.isArray(products) && products.length > 0 && <View style={styles.proceedToCheckOutContainer}>
        <TouchableOpacity style={styles.proceedToCheckOutButton}>
          <Text style={styles.proceedToCheckOutText}>Proceed To Checkout</Text>
        </TouchableOpacity>
      </View>}
    </UserLayout>
  );
}

const styles = StyleSheet.create({
  proceedToCheckOutContainer: {
    backgroundColor: theme.card,
    flexDirection: "row",
    flexShrink: 1,
    flexBasis: 'auto',
  },
  proceedToCheckOutButton: {
    backgroundColor: theme.primary,
    borderRadius: theme.radius * 2,
    paddingVertical: theme.fontSize['text-xs'],
    paddingHorizontal: theme.radius * 1.5,
    margin: theme.radius * 1.5,
    marginHorizontal: "auto"
  },
  proceedToCheckOutText: {
    fontSize: theme.fontSize['text-xl'],
    fontWeight: 'bold',
    color: theme.card,
  }
});
