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
