import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, useColorScheme, View, } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { ProductDetailsParams } from '../../Components/ProductsComponent'
import theme from '../../config/theme'
import { AntDesign } from '../../Components/CustomIcons'
import H2 from '../../Components/ui/H2'
import TextUI from '../../Components/ui/TextUI'
import APIService from '../../Functions/APIResponses'
import H3 from '../../Components/ui/H3'
import H1 from '../../Components/ui/H1'
import screenNames from '../../config/screenNames'
import { useNavigation } from '@react-navigation/native'
import { handleUnauthenticatedError } from '../../Functions/Global'
type ManageProductCartType = {
    product: ProductDetailsParams
}
const ManageProductDetailCart = ({
    product
}: ManageProductCartType) => {
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';
    const [addLoading, setAddLoading] = useState(false);
    const [cartQty, setCartQty] = useState<number>(0)
    async function addToCart() {
        setAddLoading(true);
        APIService.cart.add(product.id)
            .then(response => {
                setCartQty(response.item.quantity)
            })
            .catch(err => {
                if (err?.response?.data?.message == 'Unauthenticated.') handleUnauthenticatedError(navigation)
                console.warn(JSON.stringify(err?.response?.data))
            })
            .finally(() => {
                setAddLoading(false)
            })
    }
    async function removeToCart() {
        setAddLoading(true);
        APIService.cart.remove(product.id)
            .then(response => {
                setCartQty(response.item.quantity)
                console.log('response', JSON.stringify(response, null, 2))
            })
            .catch(err => {
                console.warn(JSON.stringify(err.message))
            })
            .finally(() => {
                setAddLoading(false)
            })
    }
    useEffect(() => {
        console.log('product.cartItem', JSON.stringify(product.cartItem, null, 2))
        setCartQty(product.cartItem || 0)
    }, [])
    if (!product) return null;
    return (
        <>
            <View style={[
                styles.bottomBar,
                {
                    backgroundColor: isDarkMode ? theme.dark.card : theme.card
                }
            ]}>
                <H2 style={styles.bottomPrice}>₹{product.price}</H2>
                {cartQty ?
                    <View>
                        <View style={{
                            ...styles.addToCartButton,
                            justifyContent: 'space-between',
                        }} >
                            <TouchableOpacity
                                disabled={addLoading}
                                onPress={removeToCart}
                            >
                                <AntDesign name='minus' />
                            </TouchableOpacity>
                            {addLoading ?
                                <ActivityIndicator size="small" color={theme.dark.foreground} />
                                :
                                <H2 style={[styles.addToCartButtonText]}>{cartQty}</H2>
                            }
                            <TouchableOpacity
                                disabled={addLoading}
                                onPress={addToCart}
                            >
                                <AntDesign name='plus' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <TouchableOpacity
                        style={[styles.addToCartButton, addLoading && { opacity: 0.5 },
                        {
                            backgroundColor: theme.primary,
                            marginVertical: theme.radius * 0.75
                        }]}
                        disabled={addLoading}
                        onPress={addToCart}
                    >
                        {addLoading ? (
                            <ActivityIndicator size="small" color={theme.dark.foreground} />
                        ) : (
                            <TextUI style={[styles.addToCartButtonText, {
                                color: '#fff',
                            }]}>Add to Cart</TextUI>
                        )}
                    </TouchableOpacity>
                }
            </View>
        </>
    )
}

export default (ManageProductDetailCart)

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.radius,
        borderTopLeftRadius: theme.radius * 2,
        borderTopRightRadius: theme.radius * 2,
    },
    bottomPrice: {
        // fontSize: theme.fontSize['text-2xl'],
        fontWeight: 'bold',
        color: theme.primary,
    },
    addToCartButton: {
        paddingHorizontal: theme.radius * 1.5,
        paddingVertical: theme.fontSize['text-xs'],
        borderRadius: theme.radius,
        alignItems: 'center',
        minWidth: theme.screenWidth / 2.5,
        flexDirection: 'row',
        justifyContent: "center",
    },
    addToCartButtonText: {
        fontWeight: "600",
    },
})