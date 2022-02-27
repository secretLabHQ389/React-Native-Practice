import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native-web'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import * as placesActions from '../store/places-actions'
import ImgPicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

const NewPlacesScreen = props => {
  const { navigation } = props
  const [selectedImage, setSelectedImage] = useState()
  const [selectedLocation, setSelectedLocation] = useState()
  const dispatch = useDispatch()
  const [titleValue, setTitleValue] = useState('')
  const titleChangeHandler = text => {
    setTitleValue(text)
  }
  
  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation))
    navigation.goBack()
  }

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath)
  }

  const onLocationPickedHandler = useCallback(location => {
    setSelectedLocation(location)
    console.log(location)
  }, [])

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput 
          style={styles.textInput} 
          onChangeText={titleChangeHandler}
          value={titleValue}
          />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker 
          navigation={navigation}
          onLocationPicked={onLocationPickedHandler}
          />
        <Button 
          title='Save Place' 
          color={Colors.primaryColor} 
          onPress={savePlaceHandler} 
          />
      </View>
    </ScrollView>
  )
}

NewPlacesScreen.navigationOptions = {
  headerTitle: 'Add Place'
}

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
})

export default NewPlacesScreen