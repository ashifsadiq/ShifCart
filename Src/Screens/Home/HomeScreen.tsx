import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import UserLayout from '../../Layouts/UserLayout';
import HomeCategories from './HomeCategories';
import HomeSearch from './HomeSearch';
import ImageGrid from '../../Components/ImageGrid';

const HomeScreen = () => {
  async function getData() {

  }
  useFocusEffect(
    useCallback(() => {
      getData();
      return () => {
        getData();
      };
    }, []),
  );
  const data = [
    <ImageGrid />,
    <HomeCategories />,
    <HomeCategories />,
    <HomeCategories />,
    <HomeCategories />,
    <HomeCategories />,
  ]
  return (
    <UserLayout>
      <FlatList
        data={data}
        ListHeaderComponent={<HomeSearch />}
        renderItem={({ item }) => item}
        keyExtractor={(item, index) => index.toString()}
      />
    </UserLayout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})