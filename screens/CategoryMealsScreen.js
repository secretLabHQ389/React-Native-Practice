import React from 'react'
import {
  View,
  Button,
  Text,
  StyleSheet
} from 'react-native'
import { CATEGORIES } from '../data/dummy-data'

const CategoryMealScreen = props => {
  const {navigation} = props
  const catId = navigation.getParam('categoryId')
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)
  return (
    <View>
      <Text>The Category Meal Screen</Text>
      <Button title='Go to Details' onPress={() => {
          navigation.navigate({
            routeName: 'MealDetail'
          })
        }} />
    </View>
  )
}

//all undefined:
CategoryMealScreen.navigationOptions = navigationData => {
  console.log('navigationData: ', navigationData)
  const catId = navigationData.navigation.getParam('categoryId')
  //const catId = navigationData.navigation.state.params('categoryId')
  console.log('catId: ', catId)
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)
  console.log('selectedCategory: ', selectedCategory)
  return {
    headerTitle: selectedCategory.title
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CategoryMealScreen