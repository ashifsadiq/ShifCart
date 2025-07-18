import { FlatList, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { ProductsComponentProps } from '../../Components/ProductsComponent';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../MainNavigator';
import APIService from '../../Functions/APIResponses';
import H1 from '../../Components/ui/H1';
import theme from '../../config/theme';
import MostPopularComponent from '../../Components/MostPopularComponent';

type HomeMostPopularProps = {
    hideListHeaderComponent?: boolean;
    style?: ViewStyle;
    numColumns?: number;
}
const HomeMostPopular = ({
    hideListHeaderComponent = true,
    style = {},
    numColumns = 3,
}: HomeMostPopularProps) => {
    const [productData, setProductData] = useState<ProductsComponentProps[]>([])
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const getData = async () => {
        try {
            const data = await APIService.dashboard.all({ mostPopular: "" });
            setProductData(data.mostPopular)
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

        <>
            {hideListHeaderComponent ? null : <ListHeaderComponent />}
            <FlatList
                data={productData}
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
                renderItem={({ item, index }) =>
                    <MostPopularComponent
                        {...item}
                    />
                }
            />
        </>
    )
}

export default memo(HomeMostPopular)

const styles = StyleSheet.create({
    flatList: {}
})