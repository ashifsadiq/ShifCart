import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { LineChart } from 'react-native-chart-kit'
import theme from '../../config/theme';

const StockChart = () => {
    const screenWidth = Dimensions.get('window').width;
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
        const count = Math.floor(Math.random() * 6); // Random number between 10 and 15
        const dates = Array.from({ length: count }, () => getRandomDate(startYear, endYear));
        const sorted = dates.sort((a, b) => a - b); // optional: sort by date
        return sorted.map(formatDate);
    }

    // Usage:
    const labels = generateRandomDates(2023, 2025);
    const dataSet = Array.from({ length: labels.length + 30 }, () => parseInt(Math.random() * 100));
    return (
        <LineChart
            data={{
                labels,
                datasets: [{
                    data: dataSet,
                }]
            }}
            onDataPointClick={(data) => {
                console.log(data)
            }}
            width={screenWidth * 0.90}
            height={theme.screenHeight / 2}
            chartConfig={{
                backgroundColor: '#f0f0f0',
                backgroundGradientFrom: '#f0f0f0',
                backgroundGradientTo: '#f0f0f0',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            withVerticalLines={false}
            getDotColor={() => "rgba(0,0,0,0)"}
            verticalLabelRotation={90}
            renderDotContent={({ x, y, index, indexData }) => (
                <View
                    key={index}
                    onPress={() => {
                        console.log([...indexData])
                    }}
                    style={{
                        position: 'absolute',
                        top: y - 5,
                        left: x - 10,
                        width: screenWidth / 75,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: dataSet[index] < (dataSet[index - 1]) ? "red" : "green",
                            width: "100%",
                            height: indexData / 2
                        }}
                    />
                </View>
            )}
            bezier
            style={styles.chart}
        />
    )
}

export default memo(StockChart)

const styles = StyleSheet.create({
    chart: {
        borderRadius: 8,
    },
})