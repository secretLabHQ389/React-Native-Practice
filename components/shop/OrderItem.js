import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native'
import Colors from '../../constants/Colors'
import CartItem from './CartItem'

const OrderItem = props => {
  const {amount, date, items} = props
  const [showDetails, setShowDetails] = useState(false)
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button 
        title={!showDetails ? 'Show Details' : 'Hide Details'}
        color={Colors.primaryColor}
        onPress={() => {
          setShowDetails(prevState => !prevState)
        }}
        />
      {showDetails && 
        <View style={styles.detailItems}>
          {items.map(cartItem => 
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              />
          )}
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  summary: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
})

export default OrderItem