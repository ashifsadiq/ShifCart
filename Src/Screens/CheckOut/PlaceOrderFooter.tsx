import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextUI from '../../Components/ui/TextUI'
import H1 from '../../Components/ui/H1'
import theme from '../../config/theme'

const PlaceOrderFooter = ({
  cartTotal = 0,
  handleCheckout = () => null
}) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.totalContainer}>
        {/* <TextUI style={styles.totalLabel}>Total</TextUI> */}
        {/* <H1 style={styles.totalAmount}>₹{cartTotal}</H1> */}
      </View>
      <TouchableOpacity
        style={[styles.checkoutButton, { backgroundColor: theme.primary }]}
        onPress={handleCheckout}
      >
        <TextUI style={styles.checkoutButtonText}>Free Place Order</TextUI>
      </TouchableOpacity>
    </View>
  )
}

export default PlaceOrderFooter

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.fontSize['text-xs'] / 2,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0', // Slight border at the top
    width: '100%',
  },

  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#333',
    marginRight: 5,
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})