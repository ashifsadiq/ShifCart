import { StyleSheet, View } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import { LineChart } from 'react-native-wagmi-charts';
import theme from '../../config/theme';

const data = [
  {
    timestamp: 1625945400000,
    value: 33575.25,
  },
  {
    timestamp: 1625946300000,
    value: 33545.25,
  },
  {
    timestamp: 1625947200000,
    value: 33510.25,
  },
  {
    timestamp: 1625948100000,
    value: 33215.25,
  },
];

function StockMovingAverage({ containerStyle }) {
  return (
    <View style={containerStyle}>
      <View style={styles.graphContainer} >
        <LineChart.Provider data={data} >
          <LineChart width={theme.screenWidth * 0.8} height={theme.screenHeight * 0.60}>
            <LineChart.Path />
            <LineChart.CursorCrosshair>
              <LineChart.Tooltip />
            </LineChart.CursorCrosshair>
          </LineChart>
        </LineChart.Provider>
      </View>
    </View>
  );
}

export default StockMovingAverage

const styles = StyleSheet.create({
  graphContainer: {
    width: theme.screenWidth * 0.8,
    flex: 1,
  }
})