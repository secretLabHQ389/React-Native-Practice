import React from 'react'
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native'
import {
  TouchableOpacity,
  Platform
} from 'react-native-web'
import { Ionicons } from '@expo/vector-icons'

const CartItem = props => {
  const { 
    quantity,
    title,
    amount,
    onRemove
  } = props
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{quantity} </Text> 
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <View style={styles.itemBody}>
        <Text style={styles.amount}>${amount}</Text>
        <TouchableOpacity 
          style={styles.deleteBtn}
          onPress={onRemove}
          >
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color='red'
            />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartItem: {
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  itemBody: {

  },
  deleteBtn: {

  }
})

export default CartItem