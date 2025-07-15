import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { ProductsComponentProps } from '../../Components/ProductsComponent';
import APIService from '../../Functions/APIResponses';
import H1 from '../../Components/ui/H1';
import theme from '../../config/theme';
import TextUI from '../../Components/ui/TextUI';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../MainNavigator';
import screenNames from '../../config/screenNames';
type HomeFlashSaleProps = {
    hideListHeaderComponent?: boolean;
    style?: ViewStyle;
    numColumns?: number;
}
const imageSize = theme.screenWidth / 5
const HomeFlashSale = ({
    hideListHeaderComponent = true,
    style = {},
    numColumns = 3
}: HomeFlashSaleProps) => {
    const cardGap = 10;
    const horizontalPadding = style.paddingHorizontal || 10;
    const cardWidth = (theme.screenWidth - (cardGap * (numColumns - 1)) - (horizontalPadding * 2)) / numColumns;

    const [productData, setProductData] = useState<ProductsComponentProps[]>([])
    const isDarkMode = useColorScheme() === 'dark';
      const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const getData = async () => {
        try {
            const data = await APIService.dashboard.all({ flashSale: "" });
            setProductData(data.flashSale)
            return;
        } catch (error) {
            return console.error(error);
        }
    }
    const ListHeaderComponent = () => {
        return <H1>Flash Sale</H1>
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <FlatList
            data={productData}
            numColumns={numColumns}
            ListHeaderComponent={hideListHeaderComponent ? null : ListHeaderComponent}
            showsVerticalScrollIndicator={false}
            style={[styles.flatList, style]}
            contentContainerStyle={{
                paddingHorizontal: horizontalPadding,
                rowGap: 12,
                paddingBottom: 16,
            }}
            columnWrapperStyle={{
                gap: 10,
                // justifyContent: 'space-between',
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: product }) =>
                product.discount ? (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(screenNames.ProductDetails, {
                                id: product.id
                            })
                        }
                        style={[styles.card, { width: cardWidth, height: cardWidth }]}>
                        <ImageBackground
                            source={{ uri: product.image }}
                            style={styles.image}
                            imageStyle={styles.imageBorder}
                            resizeMode="contain"
                        >
                            <View style={styles.discountBadge}>
                                <Text style={styles.discountText}>-{product.discount}%</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                ) : null
            }
        />
    )
}

export default memo(HomeFlashSale)

const styles = StyleSheet.create({
    flatList: {
        gap: 10
    },
    card: {
        width: "auto",
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 6 },
        // shadowOpacity: 0.1,
        // shadowRadius: 10,
        // elevation: 8, // Android
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: 10,
        width: "100%",
    },
    imageBorder: {
        borderRadius: 20,
    },
    discountBadge: {
        backgroundColor: theme.customColor.discount,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    discountText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
