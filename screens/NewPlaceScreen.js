import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native-web'

const NewPlacesScreen = props => {
  return (
    <View>
      <Text>New Places Screen</Text>
    </View>
  )
}

NewPlacesScreen.navigationOptions = {
  headerTitle: 'Add Place'
}

const styles = StyleSheet.create({

})

export default NewPlacesScreen