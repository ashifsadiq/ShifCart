import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Switch, TouchableOpacity, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '../../Components/CustomIcons';
import NavigationComponent from '../../Components/NavigationComponent';
import StockCurrentStatus from './StockCurrentStatus';
import StockTypeComponent from './StockTypeComponent';
import StockChart from './StockChart';
import StockToolTip from './StockToolTip';
import StockPrice from './StockPrice';
import StockStatus from './StockStatus';
import StockView from './StockView';

const screenWidth = Dimensions.get('window').width;

const StockScreen = () => {
  const [activePage, setActivePage] = useState(0);
  function getRandomDate(startYear, endYear) {
    const start = new Date(startYear, 0, 1).getTime();
    const end = new Date(endYear, 11, 31).getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime);
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }); // 'Jan', 'Feb', etc.
    return `${day} ${month}`;
  }

  function generateRandomDates(startYear, endYear) {
    const count = Math.floor(Math.random() * 6) + 10; // Random number between 10 and 15
    const dates = Array.from({ length: count }, () => getRandomDate(startYear, endYear));
    const sorted = dates.sort((a, b) => a - b); // optional: sort by date
    return sorted.map(formatDate);
  }

  // Usage:
  const labels = generateRandomDates(2023, 2025);
  const dataSet = Array.from({ length: labels.length }, () => parseInt(Math.random() * 100));
  return (
    <>
      <View style={styles.header}>
        <Ionicons name='arrow-back' />
        <Text style={styles.title}>360ONE</Text>
      </View>
      <FlatList
        data={[
          <>
            <StockPrice />
            <StockTypeComponent onChangeIndex={(index) => setActivePage(index)} activeIndex={activePage} />
          </>,
          <StockView
            onPageChange={(index) => setActivePage(index)}
            currentIndex={activePage}
          />,
        ]}
        renderItem={({ item }) => item}
        style={styles.container}
        ItemSeparatorComponent={() => <View style={{ paddingBottom: 20 }} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: 'transparent' },
  header: {
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  time: { textAlign: 'center', fontSize: 18, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: '600', },
});

export default memo(StockScreen);
