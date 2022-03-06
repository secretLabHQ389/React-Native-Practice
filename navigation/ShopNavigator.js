import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
//import { createStackNavigator } from 'react-navigation-stack'
// import { 
//   createAppContainer, 
//   createSwitchNavigator 
// } from 'react-navigation'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import ProductsOverviewScreen, {ProductsOverviewScreenOptions} from '../screens/shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'
import {
  SafeAreaView,
  Button,
  View
} from 'react-native'
import { 
  Platform 
} from 'react-native-web'
import { useDispatch} from 'react-redux'
import ProductDetailScreen, {ProductDetailsScreenOptions} from '../screens/shop/ProductDetailsScreen'
import EditProductScreen, {EditProductScreenOptions} from '../screens/user/EditProductScreen'
import CartScreen, {CartScreenOptions} from '../screens/shop/CartScreen'
import OrdersScreen, {OrdersScreenOptions} from '../screens/shop/OrdersScreen'
import UserProductsScreen, {UserProductsScreenOptions} from '../screens/user/UserProductsScreen'
import { Ionicons } from '@expo/vector-icons'
import AuthScreen, {AuthScreenOptions} from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'
import {
  logout
} from '../store/actions/auth'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : Colors.primaryColor
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: {
    headerTintColor: 'white'
  }
}

const ProductsStackNavigator = createStackNavigator()

//Object(...) not a fn error possibly from react-native-web

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions} >
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={ProductsOverviewScreenOptions}
        />
      <ProductsStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={ProductDetailsScreenOptions}
        />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={CartScreenOptions}
        />
    </ProductsStackNavigator.Navigator>
  )
}

// const ProductsNavigator = createStackNavigator({
//   ProductsOverview: ProductsOverviewScreen,
//   ProductDetail: ProductDetailScreen,
//   Cart: CartScreen
// }, {
//   navigationOptions: {
//     drawerIcon: drawerConfig => (
//       <Ionicons 
//         name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//         size={23}
//         color={drawerConfig.tintColor}
//         />
//     )
//   },
//   defaultNavigationOptions: defaultNavOptions
// })

const OrdersStackNavigator = createStackNavigator()

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={OrdersScreenOptions}
        />
    </OrdersStackNavigator.Navigator>
  )
}

// const OrdersNavigator = createStackNavigator({
//   Orders: OrdersScreen
// }, {
//   navigationOptions: {
//     drawerIcon: drawerConfig => (
//       <Ionicons 
//         name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//         size={23}
//         color={drawerConfig.tintColor}
//         />
//     )
//   },
//   defaultNavigationOptions: defaultNavOptions
// })

const AdminsStackNavigator = createStackNavigator()

const AdminsNavigator = () => {
  return (
    <AdminsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminsStackNavigator.Screen
        name='EditProducts'
        component={EditProductScreen}
        options={EditProductScreenOptions}
        />
      <AdminsStackNavigator.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={UserProductsScreenOptions}
        />
    </AdminsStackNavigator.Navigator>
  )
}

// const AdminsNavigator = createStackNavigator({
//   EditProduct: EditProductScreen,
//   UserProducts: UserProductsScreen
// }, {
//   navigationOptions: {
//     drawerIcon: drawerConfig => (
//       <Ionicons 
//         name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//         size={23}
//         color={drawerConfig.tintColor}
//         />
//     )
//   },
//   defaultNavigationOptions: defaultNavOptions
// })

const ShopDrawerNavigator = createDrawerNavigator()

export const ShopNavigator = () => {
  const dispatch = useDispatch()
  return (
    <ShopDrawerNavigator.Navigator 
      drawerContentOptions={{
        activeTintColor: Colors.primaryColor
      }}
      drawerContent={props => {
        const { navigation } = props
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
              <DrawerItemList {...props} /> 
                <Button
                  title='Logout'
                  color={Colors.primary}
                  onPress={
                    dispatch(logout())
                  }
                  //navigation.navigate('Auth')
                  />
            </SafeAreaView>
          </View>
        )}}
      >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
          <Ionicons 
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={props.color}
            />
          )
        }}
        />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons 
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
              />
          )
        }}
        />
      <ShopDrawerNavigator.Screen
        name='Admin'
        component={AdminsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons 
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
              />
          )
        }}
        />
    </ShopDrawerNavigator.Navigator>
  )
}

// const ShopNavigator = createDrawerNavigator({
//   Products: ProductsNavigator,
//   Orders: OrdersNavigator,
//   Admin: AdminsNavigator
// }, {
//   contentOptions: {
//     activeTintColor: Colors.primaryColor
//   },
//   contentComponent: props => {
//     const { navigation } = props
//     const dispatch = useDispatch()
//     return (
//       <View style={{flex: 1, paddingTop: 20}}>
//         <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
//           <DrawerItems {...props} color={Colors.primary} onPress={
//             dispatch(logout())}
//             //navigation.navigate('Auth')
//            />
//         </SafeAreaView>
//       </View>
//     )
//   }
// })

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={AuthScreenOptions}
        />
    </AuthStackNavigator.Navigator>
  )
}

// const AuthNavigator = createStackNavigator(
//   {
//   Auth: AuthScreen
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions
//   }
// )

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)