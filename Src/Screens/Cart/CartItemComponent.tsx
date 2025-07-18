import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native'
import React, { memo, useState } from 'react'
import { ProductsComponentProps } from '../../Components/ProductsComponent'
import TextUI from '../../Components/ui/TextUI'
import { MaterialCommunity } from '../../Components/CustomIcons'
import theme from '../../config/theme'
import APIService from '../../Functions/APIResponses'
import { handleUnauthenticatedError } from '../../Functions/Global'
import { useNavigation } from '@react-navigation/native'
import screenNames from '../../config/screenNames'
type CartItemComponentProps = {
    item: {
        product: ProductsComponentProps;
        quantity: number;
    }
    contentContainerStyle?: ViewStyle,
    decreaseQuantity?: () => void;
    increaseQuantity?: () => void;
    deleted?: () => void;
    changingQty?: () => void;

}
const CartItemComponent = ({ item, decreaseQuantity, increaseQuantity, contentContainerStyle, deleted, changingQty, }: CartItemComponentProps) => {
    const { product } = item;
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation()
    const [quantity, setQuantity] = useState(item.quantity)
    const [updatingQty, setUpdatingQty] = useState(false)
    const askToDelete = () => {
        Alert.alert('Conform Delete!', `Are you sure want to delete ${product.name}?`, [
            {
                text: 'Not Now!',
            },
            {
                text: 'Delete',
                onPress: () => handleDecreaseQuantity(),
                style: 'destructive',
            },
        ]);
    }
    const handleDecreaseQuantity = () => {
        changingQty && changingQty()
        decreaseQuantity && decreaseQuantity()
        setUpdatingQty(true);
        APIService.cart.remove(product.id)
            .then(response => {
                setQuantity(response.item.quantity)
            })
            .catch(err => {
                if (err?.response?.data?.message == 'Unauthenticated.') handleUnauthenticatedError(navigation)
                console.warn(JSON.stringify(err?.response))
            })
            .finally(() => {
                setUpdatingQty(false)
            })
    };
    const handleIncreaseQuantity = () => {
        changingQty && changingQty()
        increaseQuantity && increaseQuantity()
        setUpdatingQty(true);
        APIService.cart.add(product.id)
            .then(response => {
                setQuantity(response.item.quantity)
            })
            .catch(err => {
                if (err?.response?.data?.message == 'Unauthenticated.') handleUnauthenticatedError(navigation)
                console.warn(JSON.stringify(err?.response?.data))
            })
            .finally(() => {
                setUpdatingQty(false)
            })
    };
    if (!quantity) return null
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(screenNames.ProductDetails, {
                    id: product.id
                })
            }}
            style={[styles.cardContainer, {
                backgroundColor: isDarkMode ? theme.dark.card : theme.card,
            }]}>
            {/* Product Image and Delete Button */}
            <View style={[styles.imageContainer, {
                backgroundColor: isDarkMode ? theme.background : 'transparent',
            }]}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                />
                <TouchableOpacity style={styles.deleteButton}>
                    <MaterialCommunity name="delete-outline" size={24} color="#FF6347" />
                </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}>
                <TextUI style={styles.productNameText}>{product.name}</TextUI>
                <TextUI style={styles.priceText}>₹{product.price}</TextUI>
                <View style={styles.quantityControl}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => {
                        if (quantity == 1) {
                            return askToDelete()
                        }
                        return handleDecreaseQuantity()
                    }}>
                        <TextUI style={styles.buttonText}>-</TextUI>
                    </TouchableOpacity>
                    <View style={[styles.quantityDisplay, {
                        backgroundColor: isDarkMode ? theme.dark.muted : theme.muted,
                    }]}>
                        <TextUI style={styles.quantityText}>{updatingQty ? < ActivityIndicator size={theme.fontSize['text-lg']} /> : quantity}</TextUI>
                    </View>
                    <TouchableOpacity style={styles.quantityButton} onPress={handleIncreaseQuantity}>
                        <TextUI style={styles.buttonText}>+</TextUI>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        width: '100%',
        borderRadius: theme.fontSize['text-xl'],
        marginBottom: theme.fontSize['text-xs'],
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        borderRadius: theme.fontSize['text-xl'],
        overflow: 'hidden',
        backgroundColor: "pink"
    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 15,
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 20,
        height: "100%",
    },
    priceText: {
        fontWeight: 'bold',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    quantityButton: {
        backgroundColor: 'transparent', // Transparent background for the buttons
        borderColor: theme.primary, // Green border
        borderWidth: 2,
        borderRadius: 25, // Make them circular
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: theme.primary, // Green text for +/-
        fontWeight: 'bold',
    },
    quantityDisplay: {
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 8,
        minWidth: theme.fontSize['text-base'] * 3, // Ensure it has a minimum width
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productNameText: { // New style for product name
        fontSize: 16,
        fontWeight: 'normal',
    },
    priceAndQuantityRow: { // New wrapper to keep price and quantity on the same row
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto', // Pushes this row to the bottom of the detailsContainer
    },
})
export default memo(CartItemComponent)