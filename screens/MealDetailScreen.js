import React from 'react'
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet
} from 'react-native'
import { ScrollView } from 'react-native-web'
import { HeaderButton } from 'react-navigation-header-buttons'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { MEALS } from '../data/dummy-data'
import DefaultText from '../components/DefaultText'

const ListItem = props => {
  const {children} = props
  return (
    <View style={styles.listItem}>
      <DefaultText>{children}</DefaultText>
    </View>
  )
}

const MealDetailScreen = props => {
  const {navigation} = props
  const mealId = navigation.getParam('mealId')
  const selectedMeal = MEALS.find(meal => meal.id === mealId)
  console.log('selectedMeal: ', selectedMeal)
  return (
    <ScrollView>
      <Image 
        style={styles.image} 
        source={{uri: selectedMeal.imageUrl}} 
        />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => {
        return (
          <ListItem key={ingredient}>{ingredient}</ListItem>
        )
      })}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => {
        return (
          <ListItem key={step}>{step}</ListItem>
        )
      })}
    </ScrollView>
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
  image: {
    width: '100%',
    height: 200
  },
  details: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1
  }
})

export default MealDetailScreen