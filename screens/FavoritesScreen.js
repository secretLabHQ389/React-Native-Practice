import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import MealList from '../components/MealList'
import { useSelector } from 'react-redux'
import {
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

const FavoritesScreen = props => {
  const {navigation} = props
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals)
  return (
    <MealList
      listData={favoriteMeals}
      navigation={navigation}
      />
  )
}

FavoritesScreen.navigationOptions = navData => {
  return {
  headerTitle: 'Your Favorites',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item 
        title='Menu' 
        iconName='ios-menu' 
        onPress={() => {
          navData.navigation.toggleDrawer()
        }} 
        />
    </HeaderButtons>)
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FavoritesScreen