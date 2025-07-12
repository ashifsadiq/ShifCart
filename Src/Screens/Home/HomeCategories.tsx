import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import APIService from '../../Functions/APIResponses'
import TextUI from '../../Components/ui/TextUI'

const HomeCategories = () => {
    const getData = async () => {
        try {
            const data = await APIService.dashboard.all();
            console.log(JSON.stringify(data))
            return;
        } catch (error) {
            return;
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <View>
            <TextUI>HomeCategories</TextUI>
        </View>
    )
}

export default HomeCategories

const styles = StyleSheet.create({})