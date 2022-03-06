import React from 'react'
// import {
//   ProductsNavigator
// } from './ShopNavigator'
// import { NavigationContainer } from '@react-navigation/native'
// import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import AuthScreen from '../screens/user/AuthScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { ShopNavigator, AuthNavigator } from './ShopNavigator'
import StartupScreen from '../screens/StartupScreen'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const AuthStackNavigator = createStackNavigator()

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token) //!! to make boolean
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin)

  return (
    // <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
    //   <AuthStackNavigator.Screen
    //     name='Auth'
    //     component={AuthScreen}
    //     options={authScreenOptions}
    //     />
    // </AuthStackNavigator.Navigator>
    // <ShopNavigator />
    // <NavigationContainer>
      /* <MyStack.Navigator>
        <MyStack.Screen
          name='ProductsOverview'
          component={ProductsOverviewScreen}
          />
      </MyStack.Navigator> */
    //   <ProductsNavigator />
    // </NavigationContainer>
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  )
}

export default AppNavigator