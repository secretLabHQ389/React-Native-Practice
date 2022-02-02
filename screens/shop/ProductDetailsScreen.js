import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'

const ProductDetailScreen = props => {
  const { navigation } = props
  const productId = navigation.getParam('productId')
  console.log('productId: ', productId)
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
  
  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  )
}

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
}

export default ProductDetailScreen