import { Image, StyleSheet, Text, TouchableOpacity, View, useColorScheme, ImageStyle, ViewStyle } from 'react-native'
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
import OffPercent from './ui/OffPercent'
import screenNames from '../config/screenNames'
type ProductListComponentType = ProductDetailsParams & {
    imageStyle: ImageStyle;
    containerStyle: ViewStyle;
}
const imageWidth = theme.screenWidth * 0.35
const ProductListComponent = (product: ProductListComponentType) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate(screenNames.ProductDetails, {
                    id: product.id
                })
            }
            style={[
                styles.container, {
                    backgroundColor: isDarkMode ? theme.dark.card : theme.card,
                },
                product.containerStyle
            ]}>
            <Image
                source={{ uri: product.image }}
                style={[
                    styles.image,
                    {
                        backgroundColor: isDarkMode ? theme.background : theme.card,
                    },
                    product.imageStyle
                ]}
                resizeMode="contain"
            />
            <View style={styles.cardContainer}>
                <H3 style={{
                    fontWeight: "500"
                }} numberOfLines={2}>{product.name}</H3>
                <View style={styles.priceSection}>
                    <H2>₹{product.price}</H2>
                    <TextUI style={{
                        textDecorationLine: 'line-through',
                    }}>₹{product.mrp}</TextUI>
                    <OffPercent discount={product.discount || 0} />
                </View>
                <RatingStar ratingProps={{
                    imageSize: theme.radius * 2
                }} value={product.review || 0} count={product.review_count} />
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
        width: imageWidth,
        height: imageWidth,
        backgroundColor: theme.muted,
        borderTopLeftRadius: theme.radius * 2,
        borderTopRightRadius: theme.radius * 2,
    },
    cardContainer: {
        paddingHorizontal: theme.fontSize['text-xs'],
        marginVertical: theme.fontSize['text-xs'],
        flex: 1,
        justifyContent: "space-between"
    },
    priceSection: {
        columnGap: theme.fontSize['text-xs'],
        rowGap: theme.fontSize['text-xs'],
    },
})