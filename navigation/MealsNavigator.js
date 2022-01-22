import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen'
import { Platform } from 'react-native-web'
import Colors from '../constants/Colors'

const defafultStackNavOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accentColor
  }
}

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen
  },
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
  MealDetail: MealDetailScreen
}, {
  //mode: 'modal', slides up from bottom
  defaultNavigationOptions: defafultStackNavOptions
})

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defafultStackNavOptions
})

const tabScreenConfig = {
  Meals: {screen: MealsNavigator, navigationOptions: {
  tabBarIcon: tabInfo => {
    return ( 
      <Ionicons
        name='ios-restaurant'
        size={25}
        color={tabInfo.tintColor}
        />
      )
    },
    tabBarColor: Colors.primaryColor
  }},
  Favorites: {
    screen: FavNavigator, 
    navigationOptions: {
      tabBarLabel: 'Favorites!',
      tabBarIcon: tabInfo => {
        return ( 
          <Ionicons
            name='ios-star'
            size={25}
            color={tabInfo.tintColor}
            />
        )
      },
      tabBarColor: Colors.accentColor
    }
  }
}

const MealsFavTabNavigator = 
  Platform.OS === 'andreid' ? 
  createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: Colors.accentColor,
    shifting: true
    // barStyle: {
    //   backgroundColor: Colors.primaryColor
    // }
  }) 
  : createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    activeTintColor: Colors.accentColor
  }
})

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
})

const MainNavigator = createDrawerNavigator({
  MealsFavs: MealsFavTabNavigator,
  Filters: FiltersNavigator
})

export default createAppContainer(MainNavigator)