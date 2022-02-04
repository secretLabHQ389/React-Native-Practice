import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import {
  FlatList,
  Platform
} from 'react-native-web'
import { useSelector } from 'react-redux'
import { 
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders)
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

OrdersScreen.navigationOptions = navData => {
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

export default OrdersScreen