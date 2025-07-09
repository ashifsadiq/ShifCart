import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import theme from '../config/theme'

export default function CatButtonsSkelton() {
    return (
        <SkeletonPlaceholder borderRadius={4} >
            <SkeletonPlaceholder.Item flexDirection="row" justifyContent='center'>
                {Array(5).fill(0).map((_, i) => <SkeletonPlaceholder.Item
                    key={i.toString()}
                    width={theme.radius * 15}
                    height={theme.radius * 5}
                    marginLeft={theme.radius * 2}
                    borderRadius={theme.radius * 2}
                />)}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

const styles = StyleSheet.create({})