import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  StyleSheet
} from 'react-native'
import {
  FlatList,
  Platform,
  Alert
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
  //show this component in Admin
  const {navigation} = props
  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch()
  const  editProductHandler = id => {
    navigation.navigate('EditProduct', {productId: id})
  }

  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [{text: 'No', style: 'default'}, {test: 'Yes', style: 'destructive', onPress: () => dispatch(deleteProduct(id))}])
  }

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found, you may begin creating some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => 
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id)
          }}
          >
          <Button
            color={Colors.primaryColor}
            title='Edit'
            onPress={() => {
              editProductHandler(itemData.item.id)
            }}
            />
          <Button
            color={Colors.primaryColor}
            title='Delete'
            onPress={() => deleteHandler(itemData.item.id)}
            />
        </ProductItem>
      }
      />
  )
}

export const UserProductsScreenOptions = navData => {
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='Add'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navigation.navigate('EditProduct')
          }}
          />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default UserProductsScreen