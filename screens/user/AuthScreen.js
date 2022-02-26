import React, { useState, useReducer, useCallback, useEffect } from 'react'
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth'
// import { ActivityIndicator } from 'react-native-web'

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

const AuthScreen = props => {
  const { navigation } = props
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const [isSignup, setIsSignup] = useState(false)

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}])
    }
  }, [])

  const authHandler = async () => {
    let action
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      )
    }
    setError(null)
    setIsLoading(true) 
    try { 
      await dispatch(action)
      navigation.navigate('Shop')
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_UPDATE, 
      value: inputValue, 
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    }, 
    inputValidities: {
      email: false,
      password: false,
    }
  })

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
      >
      <Card style={styles.authContainer}>
        <ScrollView>
          <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <Input
              id='email'
              label='E-Mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorMessage='Please enter a valid email address.'
              onInputChange={inputChangeHandler}
              initialValue=''
              />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorMessage='Please enter a valid password.'
              onInputChange={inputChangeHandler}
              initialValue=''
              />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size='small' color={Colors.primaryColor} />
              ) : (
                <Button title={isSignup ? 'Sign Up' : 'Login'} color={Colors.primaryColor} onPress={authHandler} />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} color={Colors.primaryColor} onPress={() => {
                setIsSignup(prevState => !prevState)
              }} />
            </View>
          </LinearGradient>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  )
}

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  authContainer: {
    padding: 20,
    width: '80%',
    maxWidth: 400,
    maxHeight: 400
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  }
})

export default AuthScreen