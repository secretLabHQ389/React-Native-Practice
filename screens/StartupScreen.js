import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import {
  authenticate,
  setDidTryAl
} from '../store/actions/auth'

const StartupScreen = props => {
  const { navigation } = props
  const dispatch = useDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      if (!userData) {
        //navigation.navigate('Auth')
        dispatch(setDidTryAl())
        return
      }
      const transformedData = JSON.parse(userData)
      const {token, userId, expirtDate} = transformedData
      const expirationDate = new Date(expirtDate) //change back to date from iso string
      if (expirationDate <= new Date() || !token || !userId) {
        //navigation.navigate('Auth')
        dispatch(setDidTryAl())
        return
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime()
      navigation.navigate('Shop')
      dispatch(authenticate(userId, token, expirationTime))
    }
    tryLogin()
  }, [])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primaryColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default StartupScreen