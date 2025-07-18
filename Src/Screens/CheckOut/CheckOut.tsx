import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import APIService from '../../Functions/APIResponses';
import AddressList, { AddressProps } from './AddressList';
import TextUI from '../../Components/ui/TextUI';
import theme from '../../config/theme';
import { getRandomInt } from '../../Functions/Global';
import PlaceOrderFooter from './PlaceOrderFooter';

const CheckOut = () => {
  const [address, setAddress] = useState([])
  const [selectedAddress, setSelectedAddress] = useState<AddressProps['id']>()
  async function addresses() {
    APIService.addresses.all()
      .then(res => {
        setSelectedAddress(res.data[getRandomInt(0, res.data.length)].id)
        setAddress(res.data);
        console.log('res', JSON.stringify(res.data, null, 2))
      })
      .catch(err => {
        console.error(err)
      })
  }
  async function fetchData() {
    addresses()
  }
  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, []),
  );
  return (<>
    <FlatList
      data={[
        <AddressList onPressAddress={setSelectedAddress} selectedId={selectedAddress} address={address} />,
      ]}
      style={{
        flex: 1
      }}
      contentContainerStyle={{
      }}
      renderItem={({ item, index }) => item}
    />
    <PlaceOrderFooter />
  </>
  )
}

export default CheckOut

const styles = StyleSheet.create({})