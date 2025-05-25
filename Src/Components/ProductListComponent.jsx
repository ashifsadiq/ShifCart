import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import theme from '../config/theme'
import { AntDesign } from './CustomIcons';
import { useNavigation } from '@react-navigation/native';
const imageSize = theme.radius * 20
function ProductListComponent(
    {
        item = {},
        isFav = true,
        setIsFav = () => null,
        customComponentStyle = {},
        qty = undefined,
        removeFromCart = () => null,
        addToCart = () => null,
        qtyLoading = false
    }
) {
    const navigation = useNavigation()
    useEffect(() => {
        return () => { }
    }, [])
    const discountPrice = (item?.price || 0) + ((item?.price || 0) * 0.03);
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', {
            id: item.id
        })} style={[styles.container, customComponentStyle]} >
            <Image
                source={{
                    uri: item.image
                }}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text numberOfLines={2} style={styles.title} >{item.title}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.strikePrice}>₹{discountPrice.toFixed(2)}</Text>
                    <Text style={styles.price}>₹{item.price?.toFixed(2)}</Text>
                    {!qty && <TouchableOpacity onPress={setIsFav} >
                        {isFav ? <AntDesign name='heart' size={theme.fontSize['text-3xl']} color={theme.primary} /> : <AntDesign name='hearto' size={theme.fontSize['text-3xl']} color={theme.primary} />}
                    </TouchableOpacity>}
                </View>
                {qty && <View style={{
                    ...styles.addToCartButton,
                    justifyContent: 'flex-start',
                    backgroundColor: "transparent",
                    maxWidth: "50%",
                    columnGap: theme.fontSize['text-base']
                    // width: screenWidth / 2.5,
                    // opacity: addLoading ? 0.5 : 1,
                }} >
                    <TouchableOpacity
                        disabled={qtyLoading}
                        onPress={removeFromCart}
                    >
                        <Text><AntDesign size={styles.addToCartButtonText.fontSize} name='minus' /></Text>
                    </TouchableOpacity>
                    <Text style={[styles.addToCartButtonText, { color: theme.foreground }]}>{qty}</Text>
                    <TouchableOpacity
                        disabled={qtyLoading}
                        onPress={addToCart}
                    >
                        <Text><AntDesign size={styles.addToCartButtonText.fontSize} name='plus' /></Text>
                    </TouchableOpacity>
                </View>}
            </View>
        </TouchableOpacity>
    )
}
export default memo(ProductListComponent)
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: theme.radius * 2,
    },
    image: {
        width: imageSize,
        height: imageSize,
        borderRadius: theme.radius,
        marginHorizontal: theme.radius,
        backgroundColor: theme.card,
        objectFit: "contain",
    },
    content: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        fontSize: theme.fontSize['text-base'],
        flexShrink: 1,
        flexWrap: 'wrap',
        fontWeight: "600",
        paddingRight: theme.radius
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: theme.radius,
    },
    strikePrice: {
        textDecorationLine: 'line-through',
        fontSize: theme.fontSize['text-sm'],
        color: theme.foreground,
    },
    price: {
        fontSize: theme.fontSize['text-xl'],
        fontWeight: 'bold',
        color: theme.primary,
    },
    addToCartButton: {
        backgroundColor: theme.primary,
        paddingVertical: theme.fontSize['text-xs'],
        borderRadius: theme.radius,
        alignItems: 'center',
        minWidth: theme.screenWidth / 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    addToCartButtonText: {
        color: theme.dark.foreground,
        fontSize: theme.fontSize['text-xl'],
        fontWeight: '600',
    },
})