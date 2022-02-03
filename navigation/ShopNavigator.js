import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'
import { 
  Platform 
} from 'react-native'
import ProductDetailScreen from '../screens/shop/ProductDetailsScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'

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
  defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primaryColor
  }
})

export default createAppContainer(ShopNavigator)