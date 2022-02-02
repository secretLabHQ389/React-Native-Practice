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
import Colors from '../../constants/Colors'

const ProductDetailScreen = props => {
  const { navigation } = props
  const productId = navigation.getParam('productId')
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
  
  return (
    <ScrollView>
      <Image
        source={{uri: selectedProduct.imageUrl}}
        style={styles.image}
        />
        <View style={styles.action}>
          <Button
            title='Add to Cart'
            color={Colors.primaryColor}
            style={styles.button}
            onPress={() => {}}
            />
        </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    marginHorizontal: 20,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'open-sans'
  },
  action: {
    marginVertical: 10,
    textAlign: 'center'
  }
})

export default ProductDetailScreen