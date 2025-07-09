import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import theme from '../config/theme'
import { getRandomInt } from '../Functions/Global'
function CatButtonsSkelton() {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
        }}>
            <SkeletonPlaceholder borderRadius={theme.radius * 2}>
                <SkeletonPlaceholder.Item flexDirection="row">
                    {Array(5).fill(0).map((_, i) => <SkeletonPlaceholder.Item
                        key={i.toString()}
                        width={theme.radius * getRandomInt(10, 20)}
                        marginLeft={theme.radius * 2}
                        height={theme.radius * 7}
                        marginTop={theme.radius}
                    />)}
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    )
}
export default memo(CatButtonsSkelton);
const styles = StyleSheet.create({})