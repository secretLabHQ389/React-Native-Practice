import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { 
  createAppContainer, 
  createSwitchNavigator 
} from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
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
import ProductDetailScreen from '../screens/shop/ProductDetailsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import { Ionicons } from '@expo/vector-icons'
import AuthScreen from '../screens/user/AuthScreen'
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

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        size={23}
        color={drawerConfig.tintColor}
        />
    )
  },
  defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size={23}
        color={drawerConfig.tintColor}
        />
    )
  },
  defaultNavigationOptions: defaultNavOptions
})

const AdminsNavigator = createStackNavigator({
  EditProduct: EditProductScreen,
  UserProducts: UserProductsScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
        />
    )
  },
  defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  Admin: AdminsNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primaryColor
  },
  contentComponent: props => {
    const { navigation } = props
    const dispatch = useDispatch()
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          <DrawerItems {...props} color={Colors.primary} onPress={
            dispatch(logout())}
            //navigation.navigate('Auth')
           />
        </SafeAreaView>
      </View>
    )
  }
})

const AuthNavigator = createStackNavigator(
  {
  Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
)

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)