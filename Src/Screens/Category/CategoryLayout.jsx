import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import theme from '../../config/theme'
import ProductsComponent from '../../Components/ProductsComponent'
import { AntDesign } from '../../Components/CustomIcons'
import { useNavigation } from '@react-navigation/native'
import CatButtonsSkelton from '../../Components/CatButtonsSkelton'
import ProductSkelton from '../../Components/ProductSkelton'
import H2 from '../../Components/ui/H2'
import H3 from '../../Components/ui/H3'
import TextUI from '../../Components/ui/TextUI'

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
                        <H2>Categories</H2>
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
                            <H2>View All</H2>
                            <AntDesign color={theme.primary} name="rightcircle" size={theme.fontSize['text-2xl']} />
                        </TouchableOpacity>}
                    </View>,
                    <FlatList
                        data={categoryData}
                        ref={categoryListRef}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        style={{ flexGrow: 0, columnGap: 10, paddingHorizontal: theme.radius }}
                        contentContainerStyle={{
                            paddingHorizontal: theme.radius,
                            columnGap: 10,
                            ...styles.section,
                            ...contentContainerStyle,
                        }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity disabled={loading} style={[styles.button, {
                                borderColor: currentActiveCat === item ? theme.primary : 'transparent',
                            }]}
                                onPress={() => onPressCategory(item.id)}
                            >
                                <H3 style={styles.categoryText} >{item.name}</H3>
                            </TouchableOpacity>
                        )}
                    />,
                    <FlatList
                        data={categoryDataProduct ?? []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <ProductsComponent
                                id={item?.id}
                                title={item?.name}
                                image={item?.image}
                                price={item?.price}
                                mrp={item?.mrp}
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
                    />
                ]
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => item}
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
        color: theme.primary,
        textAlign: "center",
        textTransform: "capitalize"
    }
})
export default memo(CategoryLayout)