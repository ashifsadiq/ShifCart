import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../../config/theme'
import ProductsComponent from '../../Components/ProductsComponent'

export default function JustForYou({
    productData = []
}) {
    const isDarkMode = false //useColorScheme() === 'dark';
    const color = isDarkMode ? theme.foreground : theme.dark.foreground
    styles.title
    if (productData.length > 0) return (
        <>
            <Text style={[styles.subtitle, ...color]}>Just For You</Text>
            <FlatList
                data={productData}
                keyExtractor={item => item.id.toString()}
                numColumns={1}
                contentContainerStyle={{
                    columnGap: theme.radius,
                    rowGap: theme.radius,
                    alignItems: "center"
                }}
                renderItem={({ item, index }) => (
                    <ProductsComponent
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        description={item.description}
                        brand={item.brand}
                        model={item.model}
                        color={item.color}
                        category={item.category}
                        discount={item.discount}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text>No products available</Text>}
            />
        </>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: theme.fontSize['text-2xl'],
        marginBottom: 10,
        fontWeight: 'bold',
        marginTop: theme.radius * 3,
    },
})