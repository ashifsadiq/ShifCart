import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import UserLayout from '../../Layouts/UserLayout';
import { GetSingleProduct } from '../../Functions/APIResponses';
import theme from '../../config/theme';
import NavigationComponent from '../../Components/NavigationComponent';
import { AntDesign } from '../../Components/CustomIcons';
import SQLiteService from '../../Functions/SQLiteService';
import TextUI from '../../Components/ui/TextUI';
import H1 from '../../Components/ui/H1';
import H2 from '../../Components/ui/H2';

const screenWidth = Dimensions.get('window').width;

export default function ProductDetails({ route }) {
    const { id } = route?.params ?? {};
    const [productData, setProductData] = useState({});
    const [addLoading, setAddLoading] = useState(false);
    const [currentCount, setCurrentCount] = useState(null);
    const [isFav, setIsFav] = useState(false)

    const fetchProductData = async () => {
        const data = await GetSingleProduct(id);
        const item = await SQLiteService.getCartItemById(id);
        const isFavItem = await SQLiteService.isFavorite(id);
        setIsFav(isFavItem)
        setProductData(data);
        setCurrentCount(item ? item.product_qty ?? null : null)
    };
    const addToCart = async () => {
        const item = await SQLiteService.addToCart(id);
        setCurrentCount(item ? item.product_qty ?? null : null)
    };
    const removeFromCart = async () => {
        const item = await SQLiteService.removeFromCart(id);
        setCurrentCount(item ? item.product_qty ?? null : null)
    };
    const toggleFavorite = async () => {
        const isFavItem = await SQLiteService.isFavorite(id);
        setIsFav(isFavItem ? false : true);
        if (isFavItem) {
            await SQLiteService.toggleFavorite(id);
        } else {
            await SQLiteService.toggleFavorite(id);
        }
    };
    useEffect(() => {
        fetchProductData();
    }, [id]);

    const discountPrice = (productData?.price || 0) + ((productData?.price || 0) * 0.03);

    const productDetails = [
        { title: 'Brand', value: productData.brand },
        { title: 'Model', value: productData.model },
        { title: 'Color', value: productData.color },
        { title: 'Category', value: productData.category },
        { title: 'Discount', value: productData.discount ? `${productData.discount}%` : '0%' },
    ];

    return (
        <UserLayout style={{ paddingHorizontal: 0, flex: 1 }}>
            <FlatList
                ListHeaderComponent={<NavigationComponent />}
                contentContainerStyle={{
                }}
                data={[
                    <Image
                        source={{ uri: productData.image }}
                        style={[
                            styles.image,
                        ]}
                        resizeMode="contain"
                    />,
                    Object.keys(productData).length > 0 && <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: theme.radius * 1.5,
                    }}>
                        <View style={styles.priceContainer}>
                            <TextUI style={styles.strikePrice}>₹{discountPrice.toFixed(2)}</TextUI>
                            <H1 style={styles.price}>₹{productData.price?.toFixed(2)}</H1>
                        </View>
                        <TouchableOpacity onPress={toggleFavorite} >
                            {isFav ? <AntDesign name='heart' size={theme.fontSize['text-3xl']} color={theme.primary} /> : <AntDesign name='hearto' size={theme.fontSize['text-3xl']} color={theme.primary} />}
                        </TouchableOpacity>
                    </View>,
                    Object.keys(productData).length > 0 && <FlatList
                        data={productDetails}
                        keyExtractor={(item, index) => `${item.title}-${index}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.detailsList}
                        renderItem={({ item }) => (
                            <View style={styles.detailItem}>
                                <TextUI style={styles.detailTitle}>{item.title}: </TextUI>
                                <TextUI style={styles.detailValue}>{item.value}</TextUI>
                            </View>
                        )}
                        ListEmptyComponent={<H1>No product details available</H1>}
                    />,
                    <H1 style={styles.title}>{productData.title}</H1>,
                    <TextUI style={styles.description}>{productData.description}</TextUI>,
                ]}
                keyExtractor={(_, i) => i.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <View style={{ marginBottom: theme.radius }} >{item}</View>}
            />
            {Object.keys(productData).length > 0 && <View style={styles.bottomBar}>
                <Text style={styles.bottomPrice}>₹{productData.price?.toFixed(2)}</Text>
                {currentCount < 1 ? <TouchableOpacity
                    style={[styles.addToCartButton, addLoading && { opacity: 0.5 }]}
                    disabled={addLoading}
                    onPress={addToCart}
                >
                    {addLoading ? (
                        <ActivityIndicator size="small" color={theme.dark.foreground} />
                    ) : (
                        <H2 style={styles.addToCartButtonText}>Add to Cart</H2>
                    )}
                </TouchableOpacity>
                    :
                    <View style={{
                        ...styles.addToCartButton,
                        justifyContent: 'space-between',
                        backgroundColor: theme.card
                        // width: screenWidth / 2.5,
                        // opacity: addLoading ? 0.5 : 1,
                    }} >
                        <TouchableOpacity
                            disabled={addLoading}
                            onPress={removeFromCart}
                        >
                            <Text><AntDesign size={styles.addToCartButtonText.fontSize} name='minus' /></Text>
                        </TouchableOpacity>
                        <H2 style={[styles.addToCartButtonText, { color: theme.foreground }]}>{currentCount}</H2>
                        <TouchableOpacity
                            disabled={addLoading}
                            onPress={addToCart}
                        >
                            <Text><AntDesign size={styles.addToCartButtonText.fontSize} name='plus' /></Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>}
        </UserLayout>
    );
}

const styles = StyleSheet.create({
    content: {
        columnGap: theme.radius * 2,
        paddingVertical: theme.radius * 2,
    },
    image: {
        width: '100%',
        height: theme.screenWidth,
        borderBottomLeftRadius: theme.radius * 2,
        borderBottomRightRadius: theme.radius * 2,
        backgroundColor: theme.card,
        paddingHorizontal: theme.radius * 1.5
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: theme.radius,
    },
    strikePrice: {
        textDecorationLine: 'line-through',
    },
    price: {
        color: theme.primary,
    },
    detailsList: {
        columnGap: theme.radius,
        paddingHorizontal: theme.radius * 1.5
    },
    detailItem: {
        flexDirection: 'row',
        backgroundColor: theme.primaryLight,
        paddingVertical: theme.radius / 2,
        paddingHorizontal: theme.radius,
        borderRadius: theme.radius * 2,
        alignItems: 'center',
    },
    detailTitle: {
        color: theme.foreground,
        textTransform: 'capitalize',
    },
    detailValue: {
        color: theme.primary,
        textTransform: 'capitalize',
    },
    title: {
        paddingHorizontal: theme.radius * 1.5
    },
    description: {
        paddingHorizontal: theme.radius * 1.5
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.radius,
        backgroundColor: theme.card,
        borderTopLeftRadius: theme.radius * 2,
        borderTopRightRadius: theme.radius * 2,
    },
    bottomPrice: {
        fontSize: theme.fontSize['text-2xl'],
        fontWeight: 'bold',
        color: theme.primary,
    },
    addToCartButton: {
        backgroundColor: theme.primary,
        paddingHorizontal: theme.radius * 1.5,
        paddingVertical: theme.fontSize['text-xs'],
        borderRadius: theme.radius,
        alignItems: 'center',
        minWidth: screenWidth / 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    addToCartButtonText: {
        color: theme.dark.foreground,
    },
});
