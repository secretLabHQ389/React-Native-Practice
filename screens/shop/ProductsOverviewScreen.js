import React from 'react'
import {
  FlatList, 
  Platform
} from 'react-native'
import {
  ScrollView
} from 'react-native-web'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import { 
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { Button } from 'react-native-web'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {
  const {navigation} = props
  const products = useSelector(state => state.products.availableProducts)
  console.log('products: ', products)
  const dispatch = useDispatch()
  const selectItemHandler = (id, title) => {
    navigation.navigate(
      'ProductDetail',
      {productId: id,
      productTitle: title}
    )
  }
  return (
    <ScrollView>
      <FlatList 
        data={products}
        keyExtractor={item => item.id} //newer RN doesnt need
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title)
            }}
            // onAddToCart={() => {
            //   cartActions.addToCart(itemData.item)
            // }}
            navigation={navigation}
          >
            <Button
              color={Colors.primaryColor}
              title='View Details'
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title)
              }}
              />
            <Button
              color={Colors.primaryColor}
              title='To Cart'
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item))
              }}
              />
          </ProductItem>
        )}
        />
    </ScrollView>
  )
}

ProductsOverviewScreen.navigationOptions = navData => {
  const { navigation } = navData
  return {
    headerTitle: 'All Products',
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
    ),
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
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