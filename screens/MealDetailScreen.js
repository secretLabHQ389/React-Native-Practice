import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { MEALS } from '../data/dummy-data'

const MealDetailScreen = props => {
  const {navigation} = props
  const mealId = navigation.getParam('mealId')
  const selectedMeal = MEALS.find(meal => meal.id === mealId)
  return (
    <View>
      <Text>{selectedMeal.title}</Text>
      <Button title='Go Back to Categories' onPress={() => {
          navigation.popToTop() //goes back to root screen
        }} />
    </View>
  )
}

MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('mealId')
  const selectedMeal = MEALS.find(meal => meal.id === mealId)
  return {
    headerTitle: selectedMeal.title,
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item 
        title='Favorite' 
        iconName='ios-star' 
        onPress={() => {
          console.log('Marked as favorite')
        }}
        />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MealDetailScreen