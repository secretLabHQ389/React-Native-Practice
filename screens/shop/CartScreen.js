import React, {useState} from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'

const CartScreen = props => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
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

  const sendOrderHandler = async () => {
    setIsLoading(true)
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
    setIsLoading(false)
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text></Text>
        {isLoading && (
          <ActivityIndicator size='small' color={Colors.primaryColor} />
        )}
        {!isLoading && (
        <Button 
          title='Order Now' 
          disabled={cartItems.length === 0}
          onPress={sendOrderHandler}
          />
        )}
      </Card>
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
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}
            />
        }
        ></FlatList>
    </View>
  )
}

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
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
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {

  }
})

export default CartScreen