import { FlatList, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import H1 from '../../Components/ui/H1'
import APIService from '../../Functions/APIResponses';
import TextUI from '../../Components/ui/TextUI';
import theme from '../../config/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../MainNavigator';
import screenNames from '../../config/screenNames';
type HomeTopProductsProps = {
    hideListHeaderComponent?: boolean;
    style?: ViewStyle;
}
type ProductDataType = {
    id: number;
    image: string;
    name: string;
}
const imageSize = theme.screenWidth / 5
const HomeTopProducts = ({
    hideListHeaderComponent = true,
    style = {},
}: HomeTopProductsProps) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [productData, setProductData] = useState<ProductDataType[]>([])
    const isDarkMode = useColorScheme() === 'dark';
    const getData = async () => {
        try {
            const data = await APIService.dashboard.all({ topProducts: "" });
            setProductData(data.topProducts)
            return;
        } catch (error) {
            return console.error(error);
        }
    }
    const ListHeaderComponent = () => {
        return <H1>Top Products</H1>
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <FlatList
            data={productData}
            ListHeaderComponent={hideListHeaderComponent ? null : ListHeaderComponent}
            showsVerticalScrollIndicator={false}
            style={[styles.flatList, style]}
            horizontal
            contentContainerStyle={{
                gap: 10,
                marginBottom: theme.radius * 4,
                marginTop: theme.radius * 2,
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: product, index }) => <TouchableOpacity
                onPress={() =>
                    navigation.navigate(screenNames.ProductDetails, {
                        id: product.id
                    })
                }
                style={[
                    styles.touchStyle,
                    {
                        backgroundColor: isDarkMode ? theme.dark.card : theme.card,
                    }
                ]}>
                <Image
                    source={{ uri: product.image }}
                    style={{
                        width: imageSize,
                        height: imageSize,
                        borderRadius: imageSize / 2,
                        backgroundColor: isDarkMode ? theme.background : 'transparent'
                    }}
                    resizeMode="cover"
                />
            </TouchableOpacity>}
        />
    )
}

export default memo(HomeTopProducts)

const styles = StyleSheet.create({
    flatList: {
    },
    touchStyle: {
        padding: imageSize / 7,
        borderRadius: "50%"
    }
})