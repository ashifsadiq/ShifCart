import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import StockPrice from './StockPrice'
import StockTypeComponent from './StockTypeComponent'

const StockStatus = ({
    activeIndex
}) => {
    return (<>
        <StockPrice />
        <StockTypeComponent activeIndex={activeIndex} />
    </>
    )
}

export default memo(StockStatus)

const styles = StyleSheet.create({})