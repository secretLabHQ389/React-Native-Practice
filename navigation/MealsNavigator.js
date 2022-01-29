import React from 'react'
import {
  Text
} from 'react-native'
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
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
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
    tabBarColor: Colors.primaryColor,
    tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
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
      tabBarColor: Colors.accentColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
    }
  }
}

const MealsFavTabNavigator = 
  Platform.OS === 'android' ? 
  createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: Colors.accentColor,
    shifting: true
    // barStyle: {
    //   backgroundColor: Colors.primaryColor
    // }
  }) 
  : createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'open-sans-bold'
    },
    activeTintColor: Colors.accentColor
  }
})

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
  navigationOptions: {
    drawerLabel: 'Filters!!!'
  },
  defaultNavigationOptions: defafultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
  // MealsFavs: MealsFavTabNavigator,
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
  //Filters: {
    // screen: FiltersNavigator,
    // navigationOptions: {
    //   drawerLabel: 'Filters!!!'
    // }
  //}
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
})

export default createAppContainer(MainNavigator)