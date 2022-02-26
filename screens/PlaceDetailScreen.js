import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native-web'

const PlaceDetailScreen = props => {
  return (
    <View>
      <Text>Place Detail Screen</Text>
    </View>
  )
}

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('plaecTitle')
  }
}

const styles = StyleSheet.create({

})

export default PlaceDetailScreen