import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import SQLiteService from '../../Functions/SQLiteService';
import { fetchProducts } from '../../Functions/APIResponses';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import UserLayout from '../../Layouts/UserLayout';
import NavigationComponent from '../../Components/NavigationComponent';
import WishListLoadingComponent from '../WishList/WishListLoadingComponent';
import WishListEmptyComponent from '../WishList/WishListEmptyComponent';
import ProductListComponent from '../../Components/ProductListComponent';
import theme from '../../config/theme';

export default function CartScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartQty, setCartQty] = useState([]); // This state might not be strictly necessary if only used in getData
  const [totalCartNos, setTotalCartNos] = useState(0); // Initialize with 0
  const [totalCartPrice, setTotalCartPrice] = useState(0); // Initialize with 0

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const getCartItems = await SQLiteService.getCartItems();

      if (Array.isArray(getCartItems)) {
        // Calculate total quantity immediately from getCartItems
        const quantities = getCartItems.map(item => item.product_qty);
        const total = quantities.reduce((acc, qty) => acc + (Number(qty) || 0), 0);
        setTotalCartNos(total);

        // Fetch products based on product_ids
        const productIds = getCartItems.map(item => item.product_id);
        const fetchedProducts = await fetchProducts(productIds);

        if (Array.isArray(fetchedProducts)) {
          // Calculate total price and set products in a single step
          let calculatedTotalPrice = 0;
          const updatedProducts = fetchedProducts.map(product => {
            // Find the corresponding quantity for this product
            const cartItem = getCartItems.find(item => item.product_id === product.id);
            const quantity = cartItem ? (Number(cartItem.product_qty) || 0) : 0;
            const price = Number(product.price) || 0; // Ensure price is a number

            calculatedTotalPrice += (quantity * price);

            // Optionally, you might want to add quantity to the product object itself
            // for easier rendering later, but it's not strictly necessary for price calculation.
            return { ...product, quantityInCart: quantity };
          });

          setTotalCartPrice(calculatedTotalPrice);
          setProducts(updatedProducts);
          // If you still need cartQty for other reasons, set it here:
          setCartQty(quantities);

        } else {
          console.warn("fetchProducts did not return an array:", fetchedProducts);
          setProducts([]); // Clear products if fetchProducts fails or returns unexpected
          setTotalCartPrice(0);
          setCartQty([]);
        }
      } else {
        console.warn("SQLiteService.getCartItems did not return an array:", getCartItems);
        setTotalCartNos(0);
        setProducts([]);
        setTotalCartPrice(0);
        setCartQty([]);
      }
    } catch (error) {
      console.error("Error in getData:", error);
      // Optionally, you might want to set error state here to display to the user
      setTotalCartNos(0);
      setProducts([]);
      setTotalCartPrice(0);
      setCartQty([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
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
          isLoading ? <WishListLoadingComponent /> : <WishListEmptyComponent message='Nothing in our cart!' />
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
        <TouchableOpacity style={styles.proceedToCheckOutButton} onPress={() => null && navigation.navigate('CheckOut')}>
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
