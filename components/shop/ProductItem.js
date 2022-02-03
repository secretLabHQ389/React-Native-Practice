import React from 'react'
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native'
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native-web'
import Colors from '../../constants/Colors'

//lect. 169 debugging styling with View tags

const ProductItem = props => {
  const { 
    image,
    title,
    price,
    onViewDetail,
    navigation
  } = props
  let TouchableCmp = TouchableOpacity
  if (Platform.OS === 'androind' && Platform.version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }
  return (
    <TouchableCmp 
      onPress={onViewDetail}
      useForeground
      >
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image 
            source={{uri: image}}
            style={styles.image}
            />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <Button 
            title='View Details'
            onPress={onViewDetail}
            color={Colors.primaryColor}
            />
          <Button 
            title='To Cart'
            onPress={() => navigation.navigate('Cart')}
            color={Colors.primaryColor}
            />
        </View>
      </View>
    </TouchableCmp>
  )
}

const styles = StyleSheet.create({
  product: {
    margin: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '60%'
  },
  title: {
    marginVertical: 4,
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans'
  },
  actions: {
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%'
  },
  details: {
    padding: 10,
    alignItems: 'center',
    height: '15%'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  }
})

export default ProductItem