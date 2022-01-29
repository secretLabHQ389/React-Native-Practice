import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { FlatList } from 'react-native-web'
import MealItem from './MealItem'
import { useSelector } from 'react-redux'

const MealList = props => {
  const {listData, navigation} = props
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals)
  const renderMealItem = itemData => {
    const isFav = favoriteMeals.find(meal => meal.id === itemData.item.id)
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
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isFav
          }
        })
        }}
        />
    )
  }
  return (
    <View style={styles.list}>
      <Text>The Category Meal Screen</Text>
      <FlatList 
        data={listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{width: '100%'}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MealList