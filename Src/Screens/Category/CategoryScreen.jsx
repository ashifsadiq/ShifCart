import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import APIService, { categoriesData } from '../../Functions/APIResponses';
import UserLayout from '../../Layouts/UserLayout';
import TextUI from '../../Components/ui/TextUI'
import theme from '../../config/theme';
import ProductListComponent from '../../Components/ProductListComponent';

export default function CategoryScreen(props) {
    const [categoryData, setCategoryData] = useState([]);
    const [isLoadingSwitch, setIsLoadingSwitch] = useState(false)
    const fetchData = async () => {
        try {
            if (props?.route?.params?.slug) {
                const cat = await APIService.category.view(props?.route?.params?.slug)
                const { data, links, meta } = cat;
                setCategoryData(data);
                console.log(data);
                console.log({ cat: Object.keys(cat) })
            }
        } catch (error) {
            console.error('Error fetching products:15', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [isLoadingSwitch])
    return (
        <UserLayout>
            <FlatList
                data={categoryData}
                onRefresh={() => {
                    setIsLoadingSwitch(state => !state)
                }}
                refreshing={false}
                showsVerticalScrollIndicator={false}
                style={[styles.flatList]}
                numColumns={2}
                columnWrapperStyle={{
                    flex: 1,
                    columnGap: 10,
                    paddingHorizontal: 10
                }}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{
                    gap: 10,
                }}
                renderItem={({ item, index }) =>
                    <ProductListComponent
                        {...item}
                        imageStyle={{
                            width: "100%"
                        }}
                        containerStyle={{
                            maxWidth: undefined,
                            flex: 1
                        }}
                    />
                }

            />
        </UserLayout>
    )
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1
    },
})