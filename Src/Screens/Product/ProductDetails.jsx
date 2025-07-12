import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ImageView from "react-native-image-viewing";
import UserLayout from '../../Layouts/UserLayout';
import APIService from '../../Functions/APIResponses';
import theme from '../../config/theme';
import NavigationComponent from '../../Components/NavigationComponent';
import { AntDesign } from '../../Components/CustomIcons';
import SQLiteService from '../../Functions/SQLiteService';
import TextUI from '../../Components/ui/TextUI';
import H1 from '../../Components/ui/H1';
import H2 from '../../Components/ui/H2';
import { useFocusEffect } from '@react-navigation/native';
import ProductDetailReviews from './ProductDetailReviews';

const screenWidth = Dimensions.get('window').width;

export default function ProductDetails({ route }) {
    const { id, slug } = route?.params ?? {};
    const imageFlatListRef = useRef(null);
    const thumbnailRef = useRef(null);
    const [productData, setProductData] = useState({});
    const [productImages, setProductImages] = useState([])
    const [visible, setIsVisible] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentCount, setCurrentCount] = useState(null);
    const [isFav, setIsFav] = useState(false)

    const fetchProductData = async () => {
        const product = await APIService.products.view(id);
        setProductData(product.data)
        const allImages = [product.data?.image, ...(product.data?.images ?? [])].map(image => ({ uri: image }));
        setProductImages(allImages);
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

    const discountPrice = (productData?.price || 0) + ((productData?.price || 0) * 0.03);
    const viewAbilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0 && viewableItems[0].index != null) {
            const index = viewableItems[0].index;
            setCurrentImageIndex(index);
            scrollThumbnailToCenter(index);
        }
    });
    const scrollThumbnailToCenter = (index) => {
        const imageWidth = theme.radius * 10;
        const padding = imageWidth * 0.15 + theme.radius / 2;
        thumbnailRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5, // Center the item
        });
    };
    useFocusEffect(
        useCallback(() => {
            fetchProductData();
            return () => {
                setProductImages([]);
                setProductData({});
            };
        }, []),
    );
    return (
        <UserLayout style={{ paddingHorizontal: 0, flex: 1 }}>
            <NavigationComponent />
            <FlatList
                data={[
                    <FlatList
                        ref={imageFlatListRef}
                        data={productImages}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewAbilityConfig}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <Pressable onPress={() => setIsVisible(true)}>
                                <Image
                                    source={{ uri: item.uri }}
                                    style={[
                                        styles.image,
                                        {
                                            width: theme.screenWidth
                                        }
                                    ]}
                                    resizeMode="contain"
                                />
                            </Pressable>
                        )}
                    />,
                    <FlatList
                        ref={thumbnailRef}
                        data={productImages}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        contentContainerStyle={{
                        }}
                        getItemLayout={(data, index) => {
                            const itemWidth = theme.radius * 10 + theme.radius; // image + margin/padding
                            return {
                                length: itemWidth,
                                offset: itemWidth * index,
                                index,
                            };
                        }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            const imageWidth = theme.radius * 10;
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        imageFlatListRef.current?.scrollToIndex({ index, animated: true });
                                        scrollThumbnailToCenter(index);
                                    }}
                                    style={{
                                        backgroundColor: index === currentImageIndex ? theme.primary : "transparent",
                                        marginLeft: imageWidth * 0.15,
                                        padding: theme.radius / 2,
                                        borderRadius: theme.radius,
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.uri }}
                                        style={{
                                            width: imageWidth,
                                            height: imageWidth,
                                            backgroundColor: theme.card,
                                            borderRadius: theme.radius,
                                            borderColor: "transparent",
                                            borderWidth: 2
                                        }}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                    />,
                    Object.keys(productData).length > 0 && <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: theme.radius * 1.5,
                    }}>
                        <View style={styles.priceContainer}>
                            <TextUI style={styles.strikePrice}>₹{productData.mrp}</TextUI>
                            <H1 style={styles.price}>₹{productData.price}</H1>
                        </View>
                        <TouchableOpacity onPress={toggleFavorite} >
                            {isFav ? <AntDesign name='heart' size={theme.fontSize['text-3xl']} color={theme.primary} /> : <AntDesign name='hearto' size={theme.fontSize['text-3xl']} color={theme.primary} />}
                        </TouchableOpacity>
                    </View>,
                    <H1 style={styles.title}>{productData.name}</H1>,
                    <TextUI style={styles.description}>{productData.description}</TextUI>,
                    <ProductDetailReviews reviews={productData.reviews} />
                ]}
                keyExtractor={(_, i) => i.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <View style={{ marginBottom: theme.radius }} >{item}</View>}
            />
            {Object.keys(productData).length > 0 && <View style={styles.bottomBar}>
                <Text style={styles.bottomPrice}>₹{productData.price}</Text>
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
            <ImageView
                images={productImages}
                imageIndex={currentImageIndex}
                visible={visible}
                backgroundColor='#fff'
                onRequestClose={() => setIsVisible(false)}
            // onImageIndexChange={(index) => {
            //     if (visible) {
            //         imageFlatListRef.current?.scrollToIndex({ index, animated: true });
            //         scrollThumbnailToCenter(index)
            //     }
            // }}
            />
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
