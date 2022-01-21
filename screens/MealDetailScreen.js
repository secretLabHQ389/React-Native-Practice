import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

const MealDetailScreen = props => {
  const {navigation} = props
  return (
    <View>
      <Text>The Meal Detail Screen</Text>
      <Button title='Go Back to Categories' onPress={() => {
          navigation.popToTop() //goes back to root screen
        }} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MealDetailScreen