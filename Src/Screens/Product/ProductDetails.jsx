import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserLayout from '../../Layouts/UserLayout'
import { GetSingleProduct } from '../../Functions/APIResponses'
import theme from '../../config/theme'

export default function ProductDetails(props) {
    const { id } = props?.route?.params ?? {}
    const [productData, setProductData] = useState({})
    const [addLoading, setAddLoading] = useState(false)
    const screenWidth = Dimensions.get('window').width;

    const fetchProductData = async () => {
        const data = await GetSingleProduct(id);
        setProductData(data);
    }

    useEffect(() => {
        fetchProductData();
    }, [id]);

    const handleAddToCart = async () => {
        setAddLoading(true);
        setTimeout(() => {
            setAddLoading(false);
        }, 1500);
    };

    return (
        <UserLayout
            style={{
                paddingHorizontal: 0
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false} style={[
                {
                    paddingHorizontal: theme.radius * 2,
                    ...styles.content,
                },
            ]}>
                <Image
                    source={{ uri: productData.image }}
                    style={[styles.image, {
                        objectFit: "contain",
                        width: "100%",
                        height: screenWidth,
                        borderRadius: theme.radius * 2,
                        backgroundColor: theme.card,
                        ...styles.marginVertical
                    }]}
                />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: theme.radius,
                }} >
                    <Text numberOfLines={2} style={[{ textDecorationLine: "line-through", fontSize: theme.fontSize['text-sm'] }]}>₹{productData.price + ((productData.price / 100) * 3)}</Text>
                    <Text numberOfLines={2} style={[{ ...styles.price }]}>₹{productData.price}.00</Text>
                </View>
                <FlatList
                    data={[
                        {
                            title: "Brand",
                            value: productData.brand
                        },
                        {
                            title: "Model",
                            value: productData.model
                        },
                        {
                            title: "Color",
                            value: productData.color
                        },
                        {
                            title: "Category",
                            value: productData.category
                        },
                        {
                            title: "Discount",
                            value: productData.discount + "%"
                        }
                    ]}
                    horizontal
                    contentContainerStyle={{
                        columnGap: theme.radius,
                        rowGap: theme.radius * 2,
                        ...styles.marginVertical
                    }}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottomColor: theme.muted,
                            backgroundColor: theme.primaryLight,
                            paddingVertical: theme.radius / 2,
                            paddingHorizontal: theme.radius,
                            borderRadius: theme.radius * 2
                        }}>
                            <Text style={{
                                fontSize: theme.fontSize['text-base'],
                                color: theme.foreground,
                                lineHeight: 20,
                                textTransform: "capitalize"
                            }}>{item.title}: </Text>
                            <Text style={{
                                fontSize: theme.fontSize['text-lg'],
                                color: theme.primary,
                                lineHeight: 20,
                                fontWeight: "bold",
                                textTransform: "capitalize"
                            }}>{item.value}</Text>
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={<Text>No products available</Text>}
                />
                <Text style={[styles.title, styles.marginVertical]}>{productData.title}</Text>
                <Text style={[styles.description, styles.marginVertical]}>{productData.description}</Text>
                <Text style={[styles.description, styles.marginVertical]}>{productData.description}</Text>
            </ScrollView>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: theme.radius,
                backgroundColor: theme.card,
                borderTopLeftRadius: theme.radius * 2,
                borderTopRightRadius: theme.radius * 2,
            }}>
                <Text style={[styles.title, styles.marginVertical]}>₹{productData.price}.00</Text>
                <TouchableOpacity
                    style={[styles.addToCartButton, {
                        opacity: addLoading ? 0.5 : 1,
                        paddingVertical: !addLoading ? 0 : theme.radius * 0.5,
                    }]}
                    disabled={addLoading}
                    onPress={handleAddToCart}
                >
                    {!addLoading ?
                        <Text style={[styles.addToCartButtonText, styles.marginVertical]}>Add to Cart</Text>
                        :
                        <ActivityIndicator size={theme.fontSize['text-sm'] * 2} color={theme.dark.foreground} />
                    }
                </TouchableOpacity>
            </View>
        </UserLayout>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: theme.radius * 2,
    },
    title: {
        fontSize: theme.fontSize['text-2xl'],
        marginBottom: theme.radius,
        fontWeight: "bold"
    },
    description: {
        fontSize: theme.fontSize['text-sm'],
        marginBottom: theme.radius,
        color: theme.foreground,
        lineHeight: 20,
    },
    marginVertical: {
        marginVertical: theme.radius,
    },
    price: {
        fontSize: theme.fontSize['text-2xl'],
        fontWeight: 'bold',
    },
    addToCartButton: {
        backgroundColor: theme.primary,
        paddingHorizontal: theme.radius,
        borderRadius: theme.radius,
        alignItems: 'center',
        minWidth: theme.screenWidth / 2.5,
    },
    addToCartButtonText: {
        color: theme.dark.foreground,
        fontSize: theme.fontSize['text-sm'],
        fontWeight: "600",
    }
})