import React, { useState, useEffect, useCallback } from 'react'
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native'
import {
  ScrollView,
  Platform,
  Button
} from 'react-native-web'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import { 
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [refreshing, setRefreshing] = useState(false)
  const {navigation} = props
  const products = useSelector(state => state.products.availableProducts)
  console.log('products: ', products)
  const dispatch = useDispatch()
  const selectItemHandler = (id, title) => {
    setError(null)
    setIsLoading(false)
    navigation.navigate(
      'ProductDetail',
      {productId: id,
      productTitle: title}
    )
  }

  const loadProducts = useCallback(async () => {
    setError(null)
    setRefreshing(true)
    try {
      await dispatch(productActions.fetchProducts())
    } catch (err) {
      setError(err.message)
    }
    setRefreshing(false)
  }, [setIsLoading, setError])

  //make sure the data is fetched, or anything else happens, 
  //every time user enters this screen
  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts)
    return () => {
      willFocusSub.remove()
    }
  }, [loadProducts])

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => {
      setIsLoading(false)
    })
  }, [loadProducts])

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured.</Text>
        <Button title='Try again' onPress={loadProducts} color={Colors.primaryColor} />
      </View>
    )
  }
 
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primaryColor} />
      </View>
    )
  }

  if (isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some.</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <FlatList 
        onRefresh={loadProducts}
        refreshing={refreshing}
        data={products}
        key={Math.random()}
        //keyExtractor={item => item.title} //newer RN doesnt need
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

export const ProductsOverviewScreenOptions = navData => {
  const { navigation } = navData
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='Menu'
          // iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          iconName={'md-menu'}
          onPress={() => {
            navigation.toggleDrawer()
          }}
          />
    </HeaderButtons>
    ),
    headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item 
        title='Cart'
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => {
          navigation.navigate('Cart')
        }}
        />
    </HeaderButtons>)
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ProductsOverviewScreen