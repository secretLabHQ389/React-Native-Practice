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

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories'//,
  // headerStyle: {
  //   backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
  // },
  // headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accentColor
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CategoriesScreen