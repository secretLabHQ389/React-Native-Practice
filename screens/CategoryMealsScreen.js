import React from 'react'
import {
  View,
  //Button,
  Text,
  StyleSheet
} from 'react-native'
import { FlatList } from 'react-native-web'
import { CATEGORIES, MEALS } from '../data/dummy-data'
//import Colors from '../constants/Colors'
import MealItem from '../components/MealItem'

const CategoryMealScreen = props => {
  const {navigation} = props
  const renderMealItem = itemData => {
    return (
      <MealItem 
        title={itemData.item.title} 
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectMeal={() => {
          navigation.navigate({
          routeName: 'MealDetail', 
          params: {
            mealId: itemData.item.id
          }
        })
        }}
        />
    )
  }
  const catId = navigation.getParam('categoryId')
  const displayedMeals = MEALS.filter(meal => meal.categoryId.indexOf(catId) >= 0)

  return (
    <View>
      <Text>The Category Meal Screen</Text>
      {/* <Button title='Go to Details' onPress={() => {
          navigation.navigate({
            routeName: 'MealDetail'
          })
        }} /> */}
      <FlatList 
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{width: '100%'}}
        />
    </View>
  )
}

//all undefined:
CategoryMealScreen.navigationOptions = navigationData => {
  console.log('navigationData: ', navigationData)
  const catId = navigationData.navigation.getParam('categoryId')
  console.log('catId: ', catId)
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)
  console.log('selectedCategory: ', selectedCategory)
  return {
    headerTitle: selectedCategory.title//,
    // headerStyle: {
    //   backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    // },
    // headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accentColor
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