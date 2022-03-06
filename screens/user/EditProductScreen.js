import React, { 
  useEffect, 
  useCallback,
  useReducer,
  useState 
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
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
import {
  createProduct
} from '../../store/actions/products'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'

const FORM_UPDATE = 'FORM_UPDATE'

//avoids unnecessary re-creations by being outside:
const formReducer = (state, action) => {
  if (action.type === 'FORM_UPDATE') {
    console.log('form update action: ', action)
    const updatedValues = {
      ...state.inputValues,
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
  cosnt [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { navigation, route } = props
  const dispatch = useDispatch()
  const prodId = route.params ? route.params.productId : null //navigation.getParam('productId')
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

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured! ', error, [{text: 'Okay'}])
    }
  }, [error])
  
  const submitHandler = useCallback(async () => {
    console.log('Submitting: ',          
    formState.inputValues.title,
    formState.inputValues.description,
    formState.inputValues.imageUrl,
    +formState.inputValues.price)
    // if (!formState.formIsValid) {
    //   Alert.alert('Invaid title', 'Please check the errors in the form.', [
    //     {text: 'Okay'}
    //   ])
    //   return
    // }
    setError(false)
    setIsLoading(true)
    try {
      if (editedProduct) {
        await dispatch(productActions.updateProduct(
          prodId, 
          formState.inputValues.title, 
          formState.inputValues.description, 
          formState.inputValues.imageUrl
        ))
      } else {
        await dispatch(createProduct(
           formState.inputValues.title,
           formState.inputValues.description,
           formState.inputValues.imageUrl,
           +formState.inputValues.price
        ))
      }
      navigation.goBack()
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, 
  //[productActions.updateProduct, productActions.createProduct])
  [/*dispatch,*/ prodId, formState])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item 
            title='Save'
            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            onPress={submitHandler}
            />
        </HeaderButtons>
      )
    }) //setParams({'submit': submitHandler})
  }, [submitHandler])

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_UPDATE, 
      value: inputValue, 
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primaryColor} />
      </View>
    )
  }
  
  return (
    //reserve entire screen with flex 1:
    <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={100}>
    <ScrollView>
      <View style={styles.form}>
        <Input
          id='title'
          label='Title'
          errorText='Please enter a valid title'
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
          //not working in the browser:
          //onInputChange={console.log('oninputchange works')}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct? editedProduct.title : ''}
          initiallyValid={!!editedProduct}
          required
          />
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <Input
            id='imageUrl'
            label='Image Url'
            errorText='Please enter a valid image Url'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
            />
        </View>
        {editedProduct ? null : (<View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <Input
            id='price'
            label='Price'
            errorText='Please enter a valid price'
            keyboardType='decimal-pad'
            returnKeyType='next'
            required
            min={0.1}
            />
        </View>)}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <Input
            id='description'
            label='Description'
            errorText='Please enter a valid description'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
            />
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export const EditProductScreenOptions = navData => {
  //const submitFn = navData.navigation.getParam('submit')
  //const submitFn = navData.route.params ? navData.route.params.submit : null
  const routeParams = navData.route.params ? navData.route.params : {}
  return {
    headerTitle: routeParams.productId ? 'Edit Product' : 'Add product'
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default EditProductScreen