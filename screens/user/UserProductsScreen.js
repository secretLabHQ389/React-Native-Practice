import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button
} from 'react-native'
import {
  FlatList,
  Platform
} from 'react-native-web'
import ProductItem from '../../components/shop/ProductItem'
import { 
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import { deleteProduct } from '../../store/actions/products'

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch()
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => 
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
          >
          <Button
            color={Colors.primaryColor}
            title='Edit'
            onPress={() => {
              
            }}
            />
          <Button
            color={Colors.primaryColor}
            title='Delete'
            onPress={() => {
              dispatch(deleteProduct(itemData.item.id))
            }}
            />
        </ProductItem>
      }
      />
  )
}

UserProductsScreen.navigationOptions = navData => {
  const {navigation} = navData
  return {
    headerTitle: 'Your Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navigation.toggleDrawer()
          }}
          />
    </HeaderButtons>
    )
  }
}

export default UserProductsScreen