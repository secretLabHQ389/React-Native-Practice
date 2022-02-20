import React, { 
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

const FORM_UPDATE = 'FORM_UPDATE'

//avoids unnecessary re-creations by being outside:
const formReducer = (state, action) => {
  if (action.type === 'FORM_UPDATE') {
    const updatedValues = {
      ...state.inputValidities,
      [action.input]: action.value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    }
  }
  return state
}

const EditProductScreen = props => {
  const { navigation } = props
  const dispatch = useDispatch()
  const prodId = navigation.getParam('productId')
  const editedProduct = useSelector(state => 
    state.products.userProducts.find(prod => prod.id === prodId)
  )

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    }, 
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: false
  })
  
  const submitHandler = useCallback(() => {
    console.log('Submitting!')
    if (!formState.formIsValid) {
      alert('Invaid title', 'Please check the errors in the form.', [
        {text: 'Okay'}
      ])
      return
    }
    if (editedProduct) {
      dispatch(productActions.updateProduct(
        prodId, 
        formState.inputValues.title, 
        formState.inputValues.description, 
        formState.inputValues.imageUrl
      ))
    } else {
      dispatch(productActions.createProduct(
         formState.inputValues.title,
         formState.inputValues.description,
         formState.inputValues.imageUrl,
         +formState.inputValues.price
      ))
    }
    navigation.goBack()
  }, 
  //[productActions.updateProduct, productActions.createProduct])
  [/*dispatch,*/ prodId, formState])

  useEffect(() => {
    navigation.setParams({'submit': submitHandler})
  }, [submitHandler])

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false
    if (text.trim().length === 0) {
      isValid = true
    }
    dispatchFormState({
      type: FORM_UPDATE, 
      value: text, 
      isValid: isValid,
      input: inputIdentifier
    })
  }
  
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this, 'title')}
            keyboardType='default'
            autoCapitalize='sentences'
            />
          {!formState.formIsValid && <Text>Please enter a vaild title</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={textChangeHandler.bind(this, 'imageUrl')}//{text => setImageUrl(text)}
            />
        </View>
        {editedProduct ? null : (<View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.price}
            onChangeText={textChangeHandler.bind(this, 'price')}
            keyboardType='decimal-pad'
            autoCorrect
            returnKeyType='next'
          />
        </View>)}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={textChangeHandler.bind(this, 'description')}
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