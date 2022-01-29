import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  //Switch,
  StyleSheet
} from 'react-native'
import {Switch} from 'react-native-web'
import {
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors'

const FilterSwitch = props => {
  const { 
    label, 
    value, 
    onChange
  } = props
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch 
        value={value} 
        onValueChange={newValue => onChange(newValue)}
        trackColor={{true: Colors.primaryColor}}
        thumbColor={Colors.primaryColor}
        />
    </View>
  )
}

const FilterScreen = props => {
  const { navigation } = props
  const [isGlutenFree, setIsGlutenFree] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)

  //useCallback makes the fn only re-defined and then re-run if dependencies change,
  //not on every component re-render
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    }
    console.log(appliedFilters)
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian])

  useEffect(() => {
    navigation.setParams({
      save: saveFilters
    })
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label={'Gluten-free'}
        value={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
       />
      <FilterSwitch
        label={'Lactose-free'}
        value={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
       />
      <FilterSwitch
        label={'Vegan'}
        value={isVegan}
        onChange={newValue => setIsVegan(newValue)}
       />
      <FilterSwitch
        label={'Vegetarian'}
        value={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)}
       />
    </View>
  )
}

FilterScreen.navigationOptions = navData => {
  return {
  headerTitle: 'Filter Meals',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item 
        title='Menu' 
        iconName='ios-menu' 
        onPress={() => {
          navData.navigation.toggleDrawer()
        }} 
        />
    </HeaderButtons>),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='Save' 
          iconName='ios-save' 
          onPress={navData.navigation.getParam('save')} 
          />
    </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    marginVertical: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  }
})

export default FilterScreen