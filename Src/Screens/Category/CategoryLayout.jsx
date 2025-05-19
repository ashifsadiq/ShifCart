import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import theme from '../../config/theme'
import ProductsComponent from '../../Components/ProductsComponent'
import { AntDesign } from '../../Components/CustomIcons'
import { useNavigation } from '@react-navigation/native'
import CatButtonsSkelton from '../../Components/CatButtonsSkelton'
import ProductSkelton from '../../Components/ProductSkelton'

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
    const categoryListRef = React.useRef(null);
    return (<View style={[styles.section, { opacity: loading ? 0.5 : 1 }]}>
        <FlatList
            data={
                [
                    <View style={styles.header}>
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
                    </View>,
                    categoryData.length ? <FlatList
                        data={categoryData}
                        ref={categoryListRef}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        style={{ flexGrow: 0, columnGap: 10, paddingHorizontal: theme.radius }}
                        contentContainerStyle={{
                            columnGap: 10,
                            ...styles.section,
                            ...contentContainerStyle,
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
                    /> : <CatButtonsSkelton />,
                    categoryDataProduct.length ? <FlatList
                        data={categoryDataProduct ?? []}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{
                            columnGap: theme.radius,
                            rowGap: theme.radius * 2,
                            alignItems: "center",
                        }}
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
                                    marginVertical: theme.radius,
                                    marginHorizontal: theme.radius * 2,
                                }}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<Text>No products available</Text>}
                    /> : <ProductSkelton />
                ]
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => item}
            contentContainerStyle={{
                columnGap: theme.radius,
                rowGap: theme.radius * 2,
            }}
            showsVerticalScrollIndicator={false}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.radius * 2,
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