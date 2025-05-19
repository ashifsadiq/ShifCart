import { SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import theme from '../config/theme'

export default function UserLayout({ children, style }) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: isDarkMode ? theme.dark.muted : theme.muted,
            ...style
        }]} >
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})