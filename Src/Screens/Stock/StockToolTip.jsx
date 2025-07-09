import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StockToolTip = () => {
    return (
        <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>Date: 19 May, 2025</Text>
            <Text style={styles.tooltipText}>Volume: 729845</Text>
            <Text style={styles.tooltipText}>High: <Text style={styles.green}>1036.65</Text></Text>
            <Text style={styles.tooltipText}>Low: <Text style={styles.red}>993.55</Text></Text>
            <Text style={styles.tooltipText}>Open: 1010.00</Text>
            <Text style={styles.tooltipText}>Close: 1021.25</Text>
        </View>
    )
}

export default StockToolTip

const styles = StyleSheet.create({
    tooltip: { backgroundColor: '#222', padding: 10, borderRadius: 8, marginTop: 10 },
    tooltipText: { color: '#fff', marginBottom: 4 },
    green: { color: 'green' },
    red: { color: 'red' },
})