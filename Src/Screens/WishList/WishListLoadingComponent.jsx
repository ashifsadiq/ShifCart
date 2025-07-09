import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../../config/theme'

export default function WishListLoadingComponent() {
  return (
    <View style={theme.styles.justifyCen_AlignCen} >
      <Text><ActivityIndicator size={theme.radius * 5} color={theme.primary} /></Text>
    </View>
  )
}

const styles = StyleSheet.create({})