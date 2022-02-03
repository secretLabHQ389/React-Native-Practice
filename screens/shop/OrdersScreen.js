import React from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet
} from 'react-native'
import {
  Platform
} from 'react-native-web'
import { useSelector } from 'react-redux'
import { 
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders)
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
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