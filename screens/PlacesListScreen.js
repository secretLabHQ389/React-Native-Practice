import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Flatlist
} from 'react-native-web'
import {
  HeaderButtons,
  Item
} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import PlaceItem from '../components/PlaceItem'
import * as placesActions from '../store/places-actions'

const PlacesListScreen = props => {
  const { navigation } = props
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(placesActions.loadPlaces())
  }, [dispatch])
  const places = useSelector(state => state.places.places)
  return (
    <Flatlist 
      data={places} 
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            navigation.navigate('PlaceDetail', {placeTitle: itemData.item.title, placeId: itemData.item.id})
          }}
          />
      )}
      />
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