import { FlatList, StyleSheet, Text, useColorScheme, View, ViewStyle } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import APIService from '../../Functions/APIResponses'
import TextUI from '../../Components/ui/TextUI'
import ImageGrid from '../../Components/ImageGrid'
import theme from '../../config/theme'
import H1 from '../../Components/ui/H1'
import H2 from '../../Components/ui/H2'

type CategoriesImagesType = {
    name: string;
    images: string[];
}
type HomeCategoriesType = {
    hideListHeaderComponent?: boolean;
    style?: ViewStyle;
    numColumns?: number;
}
const HomeCategories = ({
    hideListHeaderComponent = true,
    style = {},
    numColumns = 2
}: HomeCategoriesType) => {
    const [categoriesImages, setCategoriesImages] = useState<CategoriesImagesType[]>([])
    const isDarkMode = useColorScheme() === 'dark';
    const getData = async () => {
        try {
            const data = await APIService.dashboard.all({ categories: "" });
            setCategoriesImages(data.categories)
            return;
        } catch (error) {
            return console.error(error);
        }
    }
    const ListHeaderComponent = () => {
        return <H1>Categories</H1>
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <FlatList
            data={categoriesImages}
            numColumns={numColumns}
            ListHeaderComponent={hideListHeaderComponent ? null : ListHeaderComponent}
            showsVerticalScrollIndicator={false}
            style={[styles.flatList, style]}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
                return <View
                    style={
                        {
                            backgroundColor: isDarkMode ? theme.dark.card : theme.card,
                            width: (theme.screenWidth / numColumns) - (theme.radius * 2),
                            padding: theme.radius,
                            marginRight: index % 2 == 0 ? theme.radius / 2 : 0,
                            marginLeft: index % 2 != 0 ? theme.radius / 2 : 0,
                            // marginBottom: theme.radius,
                            borderRadius: 16,
                        }
                    }
                >
                    <ImageGrid
                        images={item.images}
                        isTwice
                        imageStyle={{
                            backgroundColor: isDarkMode ? theme.background : 'transparent'
                        }}
                    />
                    <H2 style={{
                        padding: theme.fontSize['text-xs'] / 2,
                        paddingVertical: theme.fontSize['text-xs'],
                    }} numberOfLines={1}>{item.name}</H2>
                </View>

            }}
        />
    )
}

export default memo(HomeCategories)

const styles = StyleSheet.create({
    flatList: {
        // flex: 1
    }
})