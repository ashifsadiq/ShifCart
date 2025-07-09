import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'

const StockTypeComponent = ({
    activeIndex = 0,
    onChangeIndex = () => null
}) => {
    const flatListRef = useRef(null);
    useEffect(() => {
        flatListRef.current?.scrollToIndex({ index: activeIndex, animated: true });
    }, [activeIndex]);
    return (
        <FlatList
            ref={flatListRef}
            data={['Financial', 'Candlestick Chart', 'Moving Average']}
            renderItem={({ item, index }) => <TouchableOpacity onPress={() => onChangeIndex(index)}>
                <Text style={[styles.tab, index == activeIndex ? styles.activeTab : {}]}>{item}</Text>
            </TouchableOpacity>}
            style={styles.tabContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    )
}
export default memo(StockTypeComponent)

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: "#fff",
    },
    tab: {
        paddingHorizontal: 20,
        fontSize: 16,
        color: 'gray',
        paddingBottom: 10,
        borderColor: "#b3b1b1", borderBottomWidth: 2
    },
    activeTab: {
        color: 'blue',
        borderColor: 'blue'
    },
})