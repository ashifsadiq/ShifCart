import { ActionSheetIOS, ActivityIndicator, FlatList, RefreshControl, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import React, { useEffect, useState } from 'react'; // ❌ removed "use"
import UserLayout from '../../Layouts/UserLayout';
import { categoriesData, productsData } from '../../Functions/APIResponses';
import ProductsComponent from '../../Components/ProductsComponent';
import theme from '../../config/theme';
import CategoryLayout from '../Category/CategoryLayout';
import JustForYou from './JustForYou';

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
  const fetchData = async () => {
    setCatLoading(true)
    try {
      setProductData(await productsData({ limit: 4 }));
      const cat = await categoriesData()
      setCategoryData(cat);
      if (cat.length > 0) {
        const randomIndex = Math.floor(Math.random() * cat.length);
        const randomElement = cat[randomIndex];
        const categoryProducts = await categoriesData({
          type: randomElement,
          limit: 4,
        });
        setCurrentActiveCat(randomElement);
        setCategoryDataProduct(categoryProducts);
      }
      setCarouselImg([...Array.from({ length: 10 }, (_, index) => `https://picsum.photos/1200/627.jpg?random=${index}`)]);
    } catch (error) {
      console.log('Error fetching products:15', error);
    } finally {
      setTimeout(() => {
        setCatLoading(false)
      }, 1000);
    }
  };
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
    fetchData();
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
            onRefresh={fetchData}
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
            categoryDataProduct={categoryDataProduct}
            loading={catLoading}
          />,
          <JustForYou
            productData={productData}
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
