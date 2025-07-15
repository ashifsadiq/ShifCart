import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import TextUI from './TextUI'
import theme from '../../config/theme'

const OffPercent = ({
    discount = 0
}: {
    discount: number
}) => {
    return (
        discount ? <View style={{
            width: "100%",
        }}>
            <TextUI style={styles.discount}>{discount}% Off</TextUI>
        </View> : null
    )
}

export default memo(OffPercent)

const styles = StyleSheet.create({
    discount: {
        backgroundColor: theme.customColor.discount,
        color: theme.muted,
        fontWeight: "600",
        paddingHorizontal: theme.radius,
        paddingVertical: theme.radius / 2,
        alignSelf: "flex-start",
        borderRadius: theme.radius * 1.5,
    }
})