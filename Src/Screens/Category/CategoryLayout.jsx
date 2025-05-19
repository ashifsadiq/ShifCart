import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import theme from '../../config/theme'
import ProductsComponent from '../../Components/ProductsComponent'
import { AntDesign } from '../../Components/CustomIcons'
import { useNavigation } from '@react-navigation/native'

function CategoryLayout({
    categoryData = [],
    currentActiveCat = "",
    onPressCategory = () => null,
    categoryDataProduct = [],
    loading = false,
    hideViewAll = false,
    contentContainerStyle = {}
}) {
    const navigation = useNavigation();
    if (categoryData.length > 0) return (<View style={[styles.section, { opacity: loading ? 0.5 : 1 }]}>
        <View style={styles.header} >
            <Text style={styles.subtitle}>Categories</Text>
            {!hideViewAll && <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: theme.radius,
                    justifyContent: 'center',
                }}
                onPress={() => {
                    navigation.navigate('CategoryScreen', {
                        currentActiveCat,
                        categoryDataProduct,
                        categoryData,
                    })
                }} >
                <Text style={{ fontSize: theme.fontSize['text-xl'] }}>View All</Text>
                <AntDesign color={theme.primary} name="rightcircle" size={theme.fontSize['text-2xl']} />
            </TouchableOpacity>}
        </View>
        <FlatList
            data={categoryData}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            style={{ flexGrow: 0, columnGap: 10 }}
            contentContainerStyle={{
                columnGap: 10,
                ...styles.section,
                ...contentContainerStyle
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <TouchableOpacity disabled={loading} style={[styles.button, {
                    borderColor: currentActiveCat === item ? theme.primary : 'transparent',
                }]}
                    onPress={() => onPressCategory(item)}
                >
                    <Text style={styles.categoryText} >{item}</Text>
                </TouchableOpacity>
            )}
        />
        <FlatList
            data={categoryDataProduct ?? []}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item, index }) => (
                <ProductsComponent
                    id={item?.id}
                    title={item?.title}
                    image={item?.image}
                    price={item?.price}
                    description={item?.description}
                    brand={item?.brand}
                    model={item?.model}
                    color={item?.color}
                    category={item?.category}
                    discount={item?.discount}
                    customStyle={{
                        marginLeft: index % 2 === 0 ? 0 : theme.radius * 2,
                    }}
                />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>No products available</Text>}
            contentContainerStyle={categoryDataProduct.length === 0 ? styles.emptyContainer : null}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.radius,
    },
    subtitle: {
        fontSize: theme.fontSize['text-2xl'],
        fontWeight: 'bold',
    },
    section: {
        marginVertical: theme.radius,
        borderRadius: theme.radius * 2,
    },
    button: {
        backgroundColor: theme.primaryLight,
        paddingVertical: theme.radius * 1.5,
        paddingHorizontal: theme.radius * 2,
        borderRadius: theme.radius * 2,
        minWidth: theme.radius * 10,
        borderWidth: 1,
    },
    categoryText: {
        fontSize: theme.fontSize['text-sm'],
        color: theme.primary,
        textAlign: "center",
        textTransform: "capitalize"
    }
})
export default memo(CategoryLayout)