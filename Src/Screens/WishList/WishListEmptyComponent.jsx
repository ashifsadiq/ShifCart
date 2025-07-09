import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../../config/theme'

export default function WishListEmptyComponent({ message = "No Wish List added" }) {
    return <View style={theme.styles.justifyCen_AlignCen}>
        <Text>{message}</Text>
    </View>
}