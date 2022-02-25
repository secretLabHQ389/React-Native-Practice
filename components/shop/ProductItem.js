import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native-web'
import Card from '../UI/Card'

//lect. 169 debugging styling with View tags

const ProductItem = props => {
  const { 
    image,
    title,
    price,
    onSelect,
    navigation,
    children
  } = props
  let TouchableCmp = TouchableOpacity
  if (Platform.OS === 'androind' && Platform.version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }
  return (
    <TouchableCmp 
      onPress={onSelect}
      useForeground
      >
      <Card style={styles.product}>
        <View style={styles.imageContainer}>
          <Image 
            source={{uri: image}}
            style={styles.image}
            />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price && parseInt(price.toFixed(2))}</Text>
        </View>
        <View style={styles.actions}>
          {children}
        </View>
      </Card>
    </TouchableCmp>
  )
}

const styles = StyleSheet.create({
  product: {
    margin: 20,
    minHeight: 700,
    overflow: 'hidden'
  },
  image: {
    marginVertical: 15,
    width: '100%',
    height: '60%'
  },
  title: {
    // marginVertical: 15,
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    display: 'block'
  },
  price: {
    marginVertical: 10,
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans'
  },
  actions: {
    marginVertical: 10,
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%'
  },
  details: {
    padding: 10,
    alignItems: 'center',
    height: '17%'
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