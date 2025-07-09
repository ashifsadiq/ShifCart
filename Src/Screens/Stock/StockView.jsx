import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import StockChart from './StockChart';
import StockToolTip from './StockToolTip';
import StockCurrentStatus from './StockCurrentStatus';
import StockMovingAverage from './StockMovingAverage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const data = [
    { key: 'financial', render: () => <Text style={styles.page}>Financial</Text> },
    {
        key: 'stock',
        render: () => (
            <View style={styles.page}>
                <StockCurrentStatus />
                <StockChart />
                <StockToolTip />
            </View>
        )
    },
    { key: 'movingAverage', render: () => <StockMovingAverage containerStyle={styles.page} /> }
];

export default function StockView({
    onPageChange = () => null,
    currentIndex = 0
}) {
    const flatListRef = useRef(null);

    const handleScroll = (event) => {
        const pageIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        onPageChange?.(pageIndex);
    };
    useEffect(() => {
        flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true });
    }, [currentIndex]);
    return (
        <FlatList
            ref={flatListRef}
            data={data}
            renderItem={({ item }) => item.render()}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
        />
    );
}

const styles = StyleSheet.create({
    page: {
        width: SCREEN_WIDTH,
        paddingHorizontal: 16,
        rowGap: SCREEN_WIDTH / 35,
        flex: 1
        // justifyContent: 'center',
    },
});
