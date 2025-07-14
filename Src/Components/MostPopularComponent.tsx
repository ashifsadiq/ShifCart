import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { ProductsComponentProps } from './ProductsComponent'
import theme from '../config/theme';
import H2 from './ui/H2';
import { Ionicons } from './CustomIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../MainNavigator';

const imageWidth = theme.screenWidth * 0.35
const MostPopularComponent = (product: ProductsComponentProps) => {
    const isDarkMode = useColorScheme() === 'dark';
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('ProductDetails', {
                    id: product.id
                })
            }
            style={[
                styles.container,
                {
                    backgroundColor: isDarkMode ? theme.dark.card : theme.card,
                }
            ]}>
            <Image
                source={{ uri: product.image }}
                style={[
                    styles.image,
                    {
                        backgroundColor: isDarkMode ? theme.background : theme.card,
                    }
                ]}
                resizeMode="contain"
            />
            <View style={styles.cardDetails}>
                <H2>{JSON.stringify(product.sales)}</H2>
                <Ionicons name='heart' size={theme.fontSize['text-2xl']} />
            </View>
        </TouchableOpacity>
    )
}

export default MostPopularComponent

const styles = StyleSheet.create({
    container: {
        maxWidth: imageWidth * 1.1,
        borderRadius: theme.radius * 2,
    },
    image: {
        width: imageWidth,
        height: imageWidth,
        backgroundColor: theme.muted,
        borderTopLeftRadius: theme.radius * 2,
        borderTopRightRadius: theme.radius * 2,
        padding: imageWidth * 0.1
    },
    cardDetails: {
        padding: theme.fontSize['text-xs'],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})