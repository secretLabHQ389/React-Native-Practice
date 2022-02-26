import React, { useState } from 'react'
import {
  View,
  Button,
  Text,
  StyleSheet,
  Alert
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-peremissions'
import Colors from '../constants/Colors'

const ImgPicker = props => {
  const { onImageTaken } = props
  const [pickedImage, setPickedImage] = useState()

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!', 
        'You need to grant camera permissions to use this app.', 
        [{text: 'Okay'}]
      )
      return false
    }
    return true
  }
  
  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions()
    if (!hasPermissions) {
      return true
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    })
    console.log('image: ', image)

    setPickedImage(image.uri)
    onImageTaken(image.uri)
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
          ) : (
          <Image style={styles.image} source={{uri: pickedImage}} />
        )}
      </View>
      <Button 
        title='Take Image' 
        color={Colors.primaryColor} 
        onPress={takeImageHandler} 
        />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alightItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

export default ImgPicker