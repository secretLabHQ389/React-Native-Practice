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
  const readonly = navigation.getParam('readonly')
  const initialLocation = navigation.getParam('initialLocation')
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922, //size of viewport
    longitudeDelta: 0.0421
  }

  const selectLocationHandler = event => {
    if (readonly) {
      return
    }
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
      onPress={selectLocationHandler}
      >
        {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>}
    </MapView>
  )
}

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam('saveLocation')
  const readonly = navData.navigation.getParam('readonly')
  if (readonly) {
    return {}
  }
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