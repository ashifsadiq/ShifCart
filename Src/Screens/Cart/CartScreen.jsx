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
  const [totalCartNos, setTotalCartNos] = useState(null)
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const getData = async () => {
    setIsLoading(true);
    const getCartItems = await SQLiteService.getCartItems();
    setCartQty(getCartItems.map(item => item.product_qty));
    if (Array.isArray(getCartItems)) {
      const total = getCartItems.map(item => item.product_qty).reduce((x, y) => x + y)
      setTotalCartNos(total)
      const products = await fetchProducts(
        getCartItems.map(item => item.product_id),
      );
      if (Array.isArray(products)) {
        products.map((item, index) => setTotalCartPrice(old => old + (cartQty[index] * item.price?.toFixed(2))))
        setProducts([...products])
      };
    }
    setIsLoading(false);
  };
  const addToCart = async (id) => {
    const item = await SQLiteService.addToCart(id); getData()
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
            qtyLoading={isLoading}
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
        <View>
          <Text style={styles.bottomPrice}>₹{totalCartPrice.toLocaleString()}</Text>
          <Text style={styles.bottomQty}>{totalCartNos} Nos.</Text>
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.fontSize['text-xs'],
    paddingVertical: theme.fontSize['text-xs'],
  },
  proceedToCheckOutButton: {
    backgroundColor: theme.primary,
    borderRadius: theme.radius,
    paddingHorizontal: theme.radius * 1.5,
    paddingVertical: theme.fontSize['text-xs'] / 2,
  },
  proceedToCheckOutText: {
    fontSize: theme.fontSize['text-xl'],
    fontWeight: 'bold',
    color: theme.card,
  },
  bottomPrice: {
    fontSize: theme.fontSize['text-2xl'],
    fontWeight: 'bold',
    color: theme.primary,
  },
  bottomQty: {
    fontSize: theme.fontSize['text-base'],
    fontWeight: 'bold',
    color: theme.foreground,
  },
});
