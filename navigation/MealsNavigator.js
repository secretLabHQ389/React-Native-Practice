import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import { Platform } from 'react-native-web'
import Colors from '../constants/Colors'

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen//,
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    //   },
    //   headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accentColor
    // }
  },
  CategoryMeals: {
    screen: CategoryMealsScreen//,
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    //   },
    //   headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accentColor
    // }
  },
  MealDetail: MealDetailScreen
}, {
  //mode: 'modal', slides up from bottom
  defaultNavigationOptions: {
    navigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accentColor
    }
  }
})

export default createAppContainer(MealsNavigator)