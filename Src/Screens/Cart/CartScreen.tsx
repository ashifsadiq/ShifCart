import { FlatList, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { use, useEffect, useState, useCallback } from 'react'
import APIService from '../../Functions/APIResponses'
import { handleUnauthenticatedError } from '../../Functions/Global'
import TextUI from '../../Components/ui/TextUI'
import UserLayout from '../../Layouts/UserLayout'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CartItemComponent from './CartItemComponent'
import theme from '../../config/theme'
import H1 from '../../Components/ui/H1'
import H3 from '../../Components/ui/H3'
import H2 from '../../Components/ui/H2'
import screenNames from '../../config/screenNames'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../MainNavigator'
import HomeMostPopular from '../Home/HomeMostPopular'
import HomeNewItems from '../Home/HomeNewItems'

const CartScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [error, setError] = useState(null);
  async function fetchData(params = {}) {
    if (cartItems.length == 0) setLoading(true)
    APIService.cart.all(params)
      .then(response => {
        if (response.items) setCartItems(response.items)
        if (response.total) setCartTotal(response.total)
        if (response.no_of_items) setNumberOfItems(response.no_of_items)
        console.log('response', JSON.stringify((response), null, 2))
      })
      .catch(err => {
        if (err?.response?.data?.message == 'Unauthenticated.') handleUnauthenticatedError(navigation)
        console.warn(JSON.stringify(err?.response?.data))
      })
      .finally(() => {
        // setAddLoading(false)
        setLoading(false)
      })
  }
  async function handleCheckout() {
    navigation.navigate(screenNames.CheckOut)
  }
  function ListHeaderComponent() {
    return <View style={{
      flexDirection: "row",
      alignItems: "center",
      columnGap: theme.fontSize['text-sm']
    }} >
      <H1 style={{
        marginVertical: theme.fontSize['text-xl']
      }} >Cart</H1>
      {/* <View style={[styles.badge, {
        backgroundColor: isDarkMode ? theme.dark.card : theme.card,
      }]}>
        <Text style={styles.badgeText}>{numberOfItems}</Text>
      </View> */}
    </View>
  }
  useFocusEffect(
    useCallback(() => {
      fetchData({})
    }, []),
  );
  if (loading) return <UserLayout><TextUI>Loading...</TextUI></UserLayout>;
  if (error) return <UserLayout><TextUI>Error: {JSON.stringify(error)}</TextUI></UserLayout>;
  return (
    <UserLayout>
      <FlatList
        contentContainerStyle={{
          marginHorizontal: theme.fontSize['text-xs'] / 2
        }}
        refreshing={loading}

        showsVerticalScrollIndicator={false}
        data={[
          <FlatList
            data={cartItems}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={({ item, index }) => {
              return <CartItemComponent
                changingQty={() => {
                  fetchData({
                    total_only: true
                  })
                }}
                item={item} />
            }}
          />,
          <HomeMostPopular hideListHeaderComponent={false} />,
          <HomeNewItems hideListHeaderComponent={false} />
        ]}
        renderItem={({ item }) => item}
      />

      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <TextUI style={styles.totalLabel}>Total</TextUI>
          <H1 style={styles.totalAmount}>₹{cartTotal}</H1>
        </View>
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: theme.primary }]}
          onPress={handleCheckout}
        >
          <TextUI style={styles.checkoutButtonText}>Checkout</TextUI>
        </TouchableOpacity>
      </View>

    </UserLayout>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.fontSize['text-xs'] / 2,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0', // Slight border at the top
    width: '100%',
  },

  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#333',
    marginRight: 5,
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    borderRadius: 20, // Make it circular
    width: 40, // Adjust size to make it a perfect circle
    height: 40, // Adjust size
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#333', // Dark grey/black color for the number
    fontSize: 20,
    fontWeight: 'bold',
  },
})