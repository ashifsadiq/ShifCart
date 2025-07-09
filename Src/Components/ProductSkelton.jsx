import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import theme from '../config/theme'

export default function ProductSkelton() {
    return (
        <SkeletonPlaceholder borderRadius={4} >
            <SkeletonPlaceholder.Item justifyContent='center'>
                {Array(5).fill(0).map((_,i) => <SkeletonPlaceholder.Item
                key={i.toString()}
                    width={Dimensions.get("window").width * 0.9}
                    height={Dimensions.get("window").width * 0.9}
                    margin={theme.radius * 2}
                    borderRadius={theme.radius * 2}
                />)}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

const styles = StyleSheet.create({})