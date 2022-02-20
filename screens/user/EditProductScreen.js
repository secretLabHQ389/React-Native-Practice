import React, { 
  useState, 
  useEffect, 
  useCallback,
  useReducer 
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native'
import {
  ScrollView
} from 'react-native-web'
import { 
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productActions from '../../store/actions/products'

const EditProductScreen = props => {
  const { navigation } = props
  const dispatch = useDispatch()
  const prodId = navigation.getParam('productId')
  const editedProduct = useSelector(state => 
    state.products.userProducts.find(prod => prod.id === prodId)
  )
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
  const [titleIsValid, setTitleIsValid] = useState(false)
  const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')
  
  const submitHandler = useCallback(() => {
    console.log('Submitting!')
    if (!titleIsValid) {
      alert('Invaid title', 'Please check the errors in the form.', [
        {text: 'Okay'}
      ])
      return
    }
    if (editedProduct) {
      dispatch(productActions.updateProduct(prodId, title, description, imageUrl))
    } else {
      dispatch(productActions.createProduct(title, description, imageUrl, +price))
    }
    navigation.goBack()
  }, 
  //[productActions.updateProduct, productActions.createProduct])
  [/*dispatch,*/ prodId, title, description, imageUrl, price, titleIsValid])

  useEffect(() => {
    navigation.setParams({'submit': submitHandler})
  }, [submitHandler])

  const titleChangeHandler = text => {
    if (text.trim().length === 0) {
      setTitleIsValid(false)
    } else {
      setTitleIsValid(true)
    }
    setTitle(text)
  }
  
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler.bind(this, text)}
            keyboardType='default'
            autoCapitalize='sentences'
            />
          {!titleIsValid && <Text>Please enter a vaild title</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
            />
        </View>
        {editedProduct ? null : (<View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={text => setPrice(text)}
            keyboardType='decimal-pad'
            autoCorrect
            returnKeyType='next'
          />
        </View>)}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit')
  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='Save'
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFn}
          />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    marginVertical: 8,
    fontFamily: 'open-sans-bold'
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
})

export default EditProductScreen