import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native-web'
import {
  HeaderButtons,
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

const PlacesListScreen = props => {
  return (
    <View>
      <Text>Places List Screen</Text>
    </View>
  )
}

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item 
        title='Add Place' 
        iconName={'add-outline'} 
        onPress={() => {
          navData.navigation.navigate('NewPlace')
        }}
        />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({

})

export default PlacesListScreen