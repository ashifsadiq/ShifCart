import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import React, { useEffect, useState } from 'react'; // ❌ removed "use"
import UserLayout from '../../Layouts/UserLayout';
import APIService, { categoriesData, productsData } from '../../Functions/APIResponses';
import theme from '../../config/theme';
import CategoryLayout from '../Category/CategoryLayout';
import NavigationComponent from '../../Components/NavigationComponent';
import HomeCarousel from './HomeCarousel';

export default function HomeScreen() {
  const isDarkMode = false //useColorScheme() === 'dark';
  const color = isDarkMode ? theme.foreground : theme.dark.foreground
  styles.title
  const [carouselImg, setCarouselImg] = useState([])
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataProduct, setCategoryDataProduct] = useState([]);
  const [currentActiveCat, setCurrentActiveCat] = useState('')
  const [catLoading, setCatLoading] = useState(false)
  const fetchProducts = async () => {
    const products = await APIService.products.all().then((res) => setProductData(res.data));
    console.log(JSON.stringify(products, null, 2));
  }
  const getCategoryDataProduct = async (cat) => {
    setCurrentActiveCat(cat);
    setCatLoading(true)
    const categoryProducts = await categoriesData({
      type: cat,
      limit: 4,
    });
    setCategoryDataProduct(categoryProducts);
    setTimeout(() => {
      setCatLoading(false)
    }, 1000);
  }
  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <UserLayout
      style={{
      }}
    >
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={catLoading}
            onRefresh={fetchProducts}
            colors={[theme.primary]} // Android only: set refresh indicator color
            tintColor={theme.primary} // iOS only: set refresh indicator color
          />
        }
        data={[
          <NavigationComponent cantGoBack NavigationTitle={"Welcome Back Ashif!"} />,
          <HomeCarousel carouselImg={carouselImg} />,
          <CategoryLayout
            onPressCategory={(cat) => getCategoryDataProduct(cat)}
            currentActiveCat={currentActiveCat}
            categoryData={categoryData}
            categoryDataProduct={productData}
            loading={catLoading}
          />
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
      />
    </UserLayout>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: theme.fontSize['text-2xl'],
    marginBottom: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: theme.fontSize['text-3xl'],
    fontWeight: 'bold',
    marginBottom: theme.radius,
  },
});
