import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, useColorScheme} from 'react-native';
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
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CheckOut from './Screens/CheckOut/CheckOut';
import screenNames from './config/screenNames';
import LoginScreen from './Screens/Auth/Login/LoginScreen';

// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const isDarkMode = useColorScheme() != 'dark';
  useEffect(() => {
    (async () => {
      await SQLiteService.initDB();
    })();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: isDarkMode ? '#fff' : '#000'},
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === screenNames.HomeTab) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === screenNames.WishlistTab) {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === screenNames.CartTab) {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === screenNames.ProfileTab) {
            iconName = focused ? 'person' : 'person-outline';
          } else iconName = 'home';
          return <Ionicons name={iconName || ''} size={size} color={color} />;
        },
        scrollEnabled: true,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: isDarkMode
          ? theme.dark.mutedForeground
          : theme.mutedForeground,
      })}>
      <Tab.Screen name={screenNames.HomeTab} component={HomeScreen} />
      <Tab.Screen name={screenNames.WishlistTab} component={WishListScreen} />
      <Tab.Screen name={screenNames.CartTab} component={CartScreen} />
      <Tab.Screen name={screenNames.ProfileTab} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  const Screens = [
    [screenNames.BottomTabNavigator, BottomTabNavigator],
    [screenNames.Search, SearchScreen],
    [screenNames.SearchResults, SearchResultsScreen],
    [screenNames.CategoryScreen, CategoryScreen],
    [screenNames.ProductDetails, ProductDetails],
    [screenNames.CheckOut, CheckOut],
    [screenNames.LoginScreen, LoginScreen],
  ];
  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {Screens.map((screen, screenIndex) => (
              <Stack.Screen
                key={screenIndex.toString()}
                name={screen[0]}
                component={screen[1]}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
