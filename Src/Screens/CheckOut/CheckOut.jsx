import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserLayout from '../../Layouts/UserLayout'
import theme from '../../config/theme'
import { randomUserData } from '../../Functions/APIResponses'

const CheckOut = () => {
  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true)
    await randomUserData()
      .then(user => {
        const { email, phone } = user;
        const picture = user?.picture?.large
        const name = Object.values(user.name).join(" ")
        const address = Object.values({
          street: Object.values(user.location.street).join(", "),
          city: user.location?.city,
          state: user.location?.state,
          country: user.location?.country,
          postcode: user.location?.postcode,
        }).join(", ")
        setUserData({ email, phone, picture, name, address })
      })
      .finally(() => {
        setIsLoading(false)
      })
    return null
  }
  useEffect(() => {
    fetchData()
    return () => {
      null
    }
  }, [])
  return (
    <UserLayout style={{
      padding: theme.radius * 2
    }}>
      <Text>{JSON.stringify(userData)}</Text>
    </UserLayout>
  )
}

export default CheckOut

const styles = StyleSheet.create({})