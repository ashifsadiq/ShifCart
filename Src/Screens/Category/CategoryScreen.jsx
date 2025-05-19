import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { categoriesData } from '../../Functions/APIResponses';
import UserLayout from '../../Layouts/UserLayout';
import CategoryLayout from './CategoryLayout';

export default function CategoryScreen(props) {
    const [categoryData, setCategoryData] = useState(props?.route?.params?.categoryData ?? []);
    const [categoryDataProduct, setCategoryDataProduct] = useState(props?.route?.params?.categoryDataProduct ?? []);
    const [currentActiveCat, setCurrentActiveCat] = useState(props?.route?.params?.currentActiveCat ?? '')
    const [catLoading, setCatLoading] = useState(false)
    const fetchData = async () => {
        try {
            const cat = await categoriesData()
            setCategoryData(cat);
            if (cat.length > 0) {
                const categoryProducts = await categoriesData({
                    type: currentActiveCat,
                });
                setCategoryDataProduct(categoryProducts);
            }
        } catch (error) {
            console.log('Error fetching products:15', error);
        }
    };
    const getCategoryDataProduct = async (cat) => {
        setCurrentActiveCat(cat);
        setCatLoading(true)
        const categoryProducts = await categoriesData({
            type: cat,
        });
        setCategoryDataProduct(categoryProducts);
        setCatLoading(false)
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <UserLayout>
            <CategoryLayout
                contentContainerStyle={{
                }}
                categoryData={categoryData}
                currentActiveCat={currentActiveCat}
                categoryDataProduct={categoryDataProduct}
                loading={catLoading}
                hideViewAll
                onPressCategory={cat => getCategoryDataProduct(cat)}
            />
        </UserLayout>
    )
}

const styles = StyleSheet.create({})