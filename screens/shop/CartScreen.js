import React from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'

const CartScreen = props => {
  const dispatch = useDispatch()
  const cartTotalAmount = useSelector(state => state.cart.totalAmount)
  const cartItems = useSelector(state => {
    const transformedCartItems = []
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      })
    }
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
  })
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text></Text>
        <Button 
          title='Order Now' 
          disabled={cartItems.length === 0}
          />
      </View>
      <View>
        <Text>CART ITEMS</Text>
      </View>
      <FlatList 
        data={cartItems}
        key={item => item.productId}
        renderItem={itemData => 
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.title}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}
            />
        }
        ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    margin: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {

  }
})

export default CartScreen