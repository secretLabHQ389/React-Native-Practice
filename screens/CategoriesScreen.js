import React from 'react'
import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList
} from 'react-native'
import { TouchableOpacity/*, Platform */} from 'react-native-web'
//import Colors from '../constants/Colors'
import {
  HeaderButtons, 
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'

const CategoriesScreen = props => {
  const {navigation} = props
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile 
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id
            }
          })
        }}
        />
    )
  }
  return (
    <FlatList
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderGridItem}
      //keyExtractor={(item, index) => index.id} older RN versions need this
     />
    // <View>
    //   <Text>The Categories Screen</Text>
    //   <Button title='Go to Meals!' onPress={() => {
    //     //navigation.replace('HomeScreen')- no back, if use logs in
    //     //dont want user going back to login screenw
    //       navigation.navigate({routeName: 'CategoryMeals'}) //navigation.navigate('CategoryMeals')
    //       //ex.- to reload same screen with new components:
    //       //navigation.push('CategoryMeals')
    //     }} />
    //   <Button title='Go back' onPress={() => {
    //       navigation.goBack() //also works for nav's without a stack
    //       //navigation.pop() pops off the top most screen in the stack
    //     }} />
    // </View>
  )
}

CategoriesScreen.navigationOptions = navData => {
  return {
  headerTitle: 'Meal Categories',
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

export default CategoriesScreen