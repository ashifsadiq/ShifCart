import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../../config/theme'
import ProductsComponent from '../../Components/ProductsComponent'
import TextUI from '../../Components/ui/TextUI'
import H2 from '../../Components/ui/H2'

export default function JustForYou({
    productData = []
}) {
    const isDarkMode = false //useColorScheme() === 'dark';
    const color = isDarkMode ? theme.foreground : theme.dark.foreground
    styles.title
    if (productData.length > 0) return (
        <View style={{
            padding: 15
        }}>
            <H2>Just For You</H2>
            <FlatList
                data={productData}
                keyExtractor={item => item.id.toString()}
                numColumns={1}
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
                        customStyle={{
                            marginVertical: theme.radius,
                            marginHorizontal: theme.radius * 2,
                        }}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text>No products available</Text>}
            />
        </View>
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