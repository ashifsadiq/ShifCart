import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Screens
import HomeScreen from './Screens/Home/HomeScreen';
import WishListScreen from './Screens/WishList/WishListScreen';
import CartScreen from './Screens/Cart/CartScreen';
import ProfileScreen from './Screens/Profile/ProfileScreen';
import SearchScreen from './Screens/Search/SearchScreen';
import SearchResultsScreen from './Screens/Search/SearchResultsScreen';
import {Ionicons} from './Components/CustomIcons';
import CategoryScreen from './Screens/Category/CategoryScreen';
import ProductDetails from './Screens/Product/ProductDetails';
import SQLiteService from './Functions/SQLiteService';
import theme from './config/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CheckOut from './Screens/CheckOut/CheckOut';

// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  useEffect(() => {
    (async () => {
      await SQLiteService.initDB();
    })();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName || ''} size={size} color={color} />;
        },
        scrollEnabled: true,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.mutedForeground,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wishlist" component={WishListScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="CheckOut" component={CheckOut} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
