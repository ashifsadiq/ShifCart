import { Image, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import { ProductDetailsParams } from './ProductsComponent'
import theme from '../config/theme'
import H3 from './ui/H3'
import H2 from './ui/H2'
import TextUI from './ui/TextUI'
import { useNavigation } from '@react-navigation/native'
import RatingStar from './RatingStar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../MainNavigator'

const imageWidth = theme.screenWidth * 0.35
const ProductListComponent = (product: ProductDetailsParams) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('ProductDetails', {
                    id: product.id
                })
            }
            style={[styles.container, {
                backgroundColor: isDarkMode ? theme.dark.card : theme.card,
            }]}>
            <Image
                source={{ uri: product.image }}
                style={[
                    styles.image,
                    {
                        backgroundColor: isDarkMode ? theme.background : theme.card,
                    }
                ]}
                resizeMode="contain"
            />
            <View style={styles.cardContainer}>
                <H3 style={{
                }} numberOfLines={2}>{product.name}</H3>
                <View style={styles.priceSection}>
                    <H2>₹{product.price}</H2>
                    <TextUI>₹{product.mrp}</TextUI>
                    {product.discount ? <TextUI style={styles.discount}>{product.discount}% Off</TextUI> : null}
                </View>
                <RatingStar value={product.review} count={product.review_count} />
            </View>
        </TouchableOpacity>
    )
}

export default ProductListComponent

const styles = StyleSheet.create({
    container: {
        maxWidth: imageWidth * 1.1,
        borderRadius: theme.radius * 2,
    },
    image: {
        width: "100%",
        height: imageWidth,
        backgroundColor: theme.muted,
        borderTopLeftRadius: theme.radius * 2,
        borderTopRightRadius: theme.radius * 2,
    },
    cardContainer: {
        paddingHorizontal: theme.fontSize['text-xs'],
        marginBottom: theme.fontSize['text-xs'],
        rowGap: theme.fontSize['text-xs'],
    },
    priceSection: {
        columnGap: theme.fontSize['text-xs'],
        rowGap: theme.fontSize['text-xs'],
    },
    discount: {
        backgroundColor: theme.customColor.discount,
        color: theme.muted,
        fontWeight: "600",
        paddingHorizontal: theme.radius,
        paddingVertical: theme.radius / 2,
        alignSelf: "flex-start",
        borderRadius: theme.radius * 1.5,
    }
})