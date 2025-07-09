import { StyleSheet, Switch, Text, View } from 'react-native';
import React, { useState } from 'react';

const StockCurrentStatus = () => {
    const [stitchChart, setStitchChart] = useState(false);

    return (
        <View style={styles.container}>
            {/* OHLC Section */}
            <View style={styles.ohlcWrapper}>
                <View style={styles.row}>
                    <Text style={styles.ohlcText}>
                        <Text style={styles.label}>O: </Text>
                        <Text style={styles.green}>1074.50</Text>
                    </Text>
                    <Text style={styles.ohlcText}>
                        <Text style={styles.label}>H: </Text>
                        <Text style={styles.green}>1077.75</Text>
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.ohlcText}>
                        <Text style={styles.label}>L: </Text>
                        <Text style={styles.red}>998.00</Text>
                    </Text>
                    <Text style={styles.ohlcText}>
                        <Text style={styles.label}>C: </Text>
                        <Text style={styles.red}>1065.60</Text>
                    </Text>
                </View>
            </View>

            {/* Volume Switch */}
            <View style={styles.volumeContainer}>
                <Text style={styles.volumeText}>Volume Chart</Text>
                <Switch value={stitchChart} onValueChange={setStitchChart} />
            </View>
        </View>
    );
};

export default StockCurrentStatus;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    ohlcWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
        width: 180,
    },
    ohlcText: {
        fontSize: 14,
    },
    label: {
        fontWeight: 'bold',
        color: '#000',
    },
    green: {
        color: 'green',
    },
    red: {
        color: 'red',
    },
    volumeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    volumeText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
});
