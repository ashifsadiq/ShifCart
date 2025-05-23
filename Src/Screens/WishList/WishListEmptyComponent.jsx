import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../../config/theme'

export default function WishListEmptyComponent() {
    return <View style={theme.styles.justifyCen_AlignCen}>
        <Text>No Wish List added</Text>
    </View>
}