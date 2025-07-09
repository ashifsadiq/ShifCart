import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '../../Components/CustomIcons'
import theme from '../../config/theme'

const StockPrice = () => {
    return (
        <View style={styles.container}>
            <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>1060.55</Text>
                <View style={styles.priceStatus}>
                    <Text style={styles.priceChange}>-5.05 (-0.47%)</Text>
                    <Ionicons name='caret-down-outline' size={24} color='red' />
                </View>
            </View>
            <View>
                <Text style={styles.ohlcText}>High: <Text style={styles.green}>1077.75</Text></Text>
                <Text style={styles.ohlcText}>Low: <Text style={styles.red}>998.00</Text></Text>
            </View>
        </View>
    )
}

export default StockPrice

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingVertical: theme.screenWidth / 100,
        paddingHorizontal: theme.screenWidth / 30,
        flexDirection: "row",
        justifyContent: "center"
    },
    priceContainer: {
        flex: 1
    },
    currentPrice: { fontSize: 24, fontWeight: 'bold' },
    priceChange: { color: 'red' },
    priceStatus: {
        flexDirection: "row",
        alignItems: "center"
    },
    green: { color: 'green' },
    red: { color: 'red' },
})