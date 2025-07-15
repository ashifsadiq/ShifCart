import { SectionList, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import UserLayout from '../../Layouts/UserLayout';
import HomeCategories from './HomeCategories';
import theme from '../../config/theme';
import H1 from '../../Components/ui/H1';
import TextUI from '../../Components/ui/TextUI';
import HomeTopProducts from './HomeTopProducts';
import HomeNewItems from './HomeNewItems';
import HomeMostPopular from './HomeMostPopular';
import HomeFlashSale from './HomeFlashSale';

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [refreshSwitch, setRefreshSwitch] = useState(false)
  const DATA = [
    {
      title: 'Most Popular',
      data: [
        <HomeMostPopular style={styles.eachItemStyle} />
      ]
    },
    {
      title: 'Flash Sale',
      data: [
        <HomeFlashSale style={styles.eachItemStyle} />
      ]
    },
    {
      title: 'New Items',
      data: [
        <HomeNewItems style={styles.eachItemStyle} />
      ]
    },
    {
      title: 'Top Products',
      data: [
        <HomeTopProducts style={styles.eachItemStyle} />
      ],
    },
    {
      title: 'Categories',
      data: [
        <HomeCategories
          style={styles.eachItemStyle} />
      ],
    },
  ];
  return (
    <UserLayout style={styles.container}>
      <SectionList
        stickySectionHeadersEnabled={true}
        onRefresh={() => {
          setRefreshSwitch(ttt => !ttt)
        }}
        key={refreshSwitch}
        refreshing={false}
        sections={DATA}
        style={styles.container}
        removeClippedSubviews={true}
        contentContainerStyle={{
          paddingBottom: theme.screenHeight / 20
        }}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
        renderSectionHeader={({ section: { title } }) => (
          <H1 style={
            [
              styles.sectionHeader,
              {
                backgroundColor: isDarkMode ? theme.dark.muted : theme.muted,
              }
            ]
          }>{title}</H1>
        )}
      />
    </UserLayout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListStyle: {
    // rowGap: theme.radius * 2,
  },
  sectionHeader: {
    paddingHorizontal: theme.radius,
    paddingVertical: theme.fontSize['text-xs'] / 2
  },
  eachItemStyle: {
    paddingHorizontal: theme.radius,
    // flex: 1
  }
})