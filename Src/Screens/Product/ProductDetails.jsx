import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserLayout from '../../Layouts/UserLayout'
import { GetSingleProduct } from '../../Functions/APIResponses'
import theme from '../../config/theme'

export default function ProductDetails(props) {
    const { id } = props?.route?.params ?? {}
    const [productData, setProductData] = useState({})
    const screenWidth = Dimensions.get('window').width;

    const fetchProductData = async () => {
        const data = await GetSingleProduct(id);
        setProductData(data);
    }

    useEffect(() => {
        fetchProductData();
    }, [id]);

    return (
        <UserLayout
            style={{
                rowGap: theme.radius * 3,
                paddingHorizontal: 0
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                <Image
                    source={{ uri: productData.image }}
                    style={[styles.image, {
                        objectFit: "contain",
                        width: "100%",
                        height: screenWidth,
                        borderRadius: theme.radius * 2,
                        backgroundColor: theme.card,
                    }]}
                />
                <Text style={[styles.title]}>{productData.title}</Text>
                <Text style={[styles.description]}>{productData.description}</Text>
                <Text style={[styles.description]}>{productData.description}</Text>
            </ScrollView>
        </UserLayout>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: theme.radius * 2,
        marginVertical: theme.radius,
    },
    title: {
        fontSize: theme.fontSize['text-2xl'],
        marginBottom: theme.radius,
        fontWeight: "bold"
    },
    description: {
        fontSize: theme.fontSize['text-sm'],
        marginBottom: theme.radius,
        color: theme.foreground,
        lineHeight: 20,
    }
})