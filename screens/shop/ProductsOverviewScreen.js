import React from 'react'
import {
  FlatList, 
  Platform
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import { 
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

const ProductsOverviewScreen = props => {
  const {navigation} = props
  const products = useSelector(state => state.products.availableProducts)
  const dispatch = useDispatch()
  return (
    <FlatList 
      data={products}
      keyExtractor={item => item.id} //newer RN doesnt need
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            navigation.navigate(
              'ProductDetail',
              {productId: itemData.item.id,
              productTitle: itemData.item.title}
            )
          }}
          // onAddToCart={() => {
          //   cartActions.addToCart(itemData.item)
          // }}
          navigation={navigation}
        />
      )}
      />
  )
}

ProductsOverviewScreen.navigationOptions = navData => {
  const { navigation } = navData
  return {
    headerTitle: 'All Products',
    headerLeft: <HeaderButtons HeaderButtonsComponent={HeaderButton}>
    <Item 
      title='Menu'
      iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
      onPress={() => {
        navigation.toggleDrawer()
      }}
      />
  </HeaderButtons>,
    headerRight: <HeaderButtons HeaderButtonsComponent={HeaderButton}>
      <Item 
        title='Cart'
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => {
          navigation.navigate('Cart')
        }}
        />
    </HeaderButtons>
  }
}

export default ProductsOverviewScreen