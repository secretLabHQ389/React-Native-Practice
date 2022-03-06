import React, { useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  Alert,
  StyleSheet
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true
    }
  }
})

const ProductDetailScreen = props => {
  const { navigation, route } = props
  const dispatch = useDispatch()
  const productId = route.params.productId //navigation.getParam('productId')
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
  
  useEffect(() => {
    //only for iOS:
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(statusObj => {
      if (statusObj.status !== 'granted') {
        return Permissions.askAsync(Permissions.NOTIFICATIONS)
      }
      return statusObj
    }).then(statusObj => {
      if (statusObj.status !== 'granted') {
        Alert.alert('Allow notifications for response.')
        return
      }
    })
  } , [])

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })

    return () => {
      backgroundSubscription.remove()
      foregroundSubscription.remove()
    }
  }, [])

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(selectedProduct))
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Item added to cart',
        body: 'Checkout now or keep shoppping.'
      },
      trigger: {
        seconds: 2
      }
    })
  }

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
            onPress={addToCartHandler}
            />
        </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

export const ProductDetailsScreenOptions = navData => {
  return {
    headerTitle: navData.route.params.productTitle //.navigation.getParam('productTitle')
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