import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'
import { 
  Platform 
} from 'react-native'
import ProductDetailScreen from '../screens/shop/ProductDetailsScreen'

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen
}, {
  defaultNavigationOptions: {
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
})

export default createAppContainer(ProductsNavigator)