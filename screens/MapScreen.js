import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native-web'
import MapView, { Marker } from 'react-native-maps'
import Colors from '../constants/Colors'

const MapScreen = props => {
  const { navigation } = props
  const [selectedLocation, setSelectedLocation] = useState()

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922, //size of viewport
    longitudeDelta: 0.0421
  }

  const selectLocationHandler = event => {
    console.log(event)
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectLocation) {
      return
    }
    navigation.navigate('NewPlace', {pickedLocation: selectedLocation})
  }, [selectLocation])

  useEffect(() => {
    navigation.setParams({saveLocation: savePickedLocationHandler})
  }, [savePickedLocationHandler])

  let markerCoordinates

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  }

  return (
    <MapView
      region={mapRegion}
      style={styles.map}
      >
        {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>}
    </MapView>
  )
}

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam('saveLocation')
  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Colors.primaryColor
  }
})

export default MapScreen