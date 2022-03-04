import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import {
  FlatList,
  Platform
} from 'react-native-web'
import { useSelector, useDispatch } from 'react-redux'
import { 
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from '../../store/actions/orders'

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    //add error handling to prevent constant loading:
    dispatch(ordersActions.fetchOrders()).then(setIsLoading(false))
    //dispatch sometimes doesnt work as a dependency-
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primaryColor} />
      </View>
    )
  }


  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found, you may begin creating some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem 
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
          />
      )}
      />
  )
}

export const OrdersScreenOptions = navData => {
  const { navigation } = navData
  return {
    headerTitle: 'Your Orders',
    headerLeft: <HeaderButtons HeaderButtonsComponent={HeaderButton}>
      <Item 
        title='Menu'
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          navigation.toggleDrawer()
        }}
        />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default OrdersScreen