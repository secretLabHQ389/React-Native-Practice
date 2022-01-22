import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealList from '../components/MealList'

const CategoryMealScreen = props => {
  const {navigation} = props
  const catId = navigation.getParam('categoryId')
  const displayedMeals = MEALS.filter(meal => meal.categoryId.indexOf(catId) >= 0)

  return (
    <MealList 
      listData={displayedMeals}
      navigation={navigation}
      />
  )
}

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId')
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)
  return {
    headerTitle: selectedCategory.title//,
    // headerStyle: {
    //   backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    // },
    // headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accentColor
  }
}

const styles = StyleSheet.create({

})

export default CategoryMealScreen