import { FlatList, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
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
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataProduct, setCategoryDataProduct] = useState([]);
  const [currentActiveCat, setCurrentActiveCat] = useState('')
  const [catLoading, setCatLoading] = useState(false)
  const fetchData = async () => {
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
    } catch (error) {
      console.log('Error fetching products:15', error);
    }
  };
  const getCategoryDataProduct = async (cat) => {
    setCurrentActiveCat(cat);
    setCatLoading(true)
    const categoryProducts = await categoriesData({
      type: cat,
      limit: 4,
    });
    console.log(categoryProducts);
    setCategoryDataProduct(categoryProducts);
    setCatLoading(false)
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserLayout
      style={{
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={{
        margin: theme.radius,
      }}>
        <Text style={[styles.title, ...color]}>Welcome to ShopEasy</Text>
        <CategoryLayout
          onPressCategory={(cat) => getCategoryDataProduct(cat)}
          currentActiveCat={currentActiveCat}
          categoryData={categoryData}
          categoryDataProduct={categoryDataProduct}
          loading={catLoading}
        />
        <JustForYou
          productData={productData}
        />
      </ScrollView>
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
