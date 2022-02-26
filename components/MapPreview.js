import React from 'react'
import {
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'

const MapPreview = props => {
  const { 
    children, 
    location,
    onPress 
  } = props
  let imagePreviewUrl
  if (location) {
    imagePreviewUrl = `<googleMapUrl?ApiKey> all on one line`
  }
  
  return (
    <TouchableOpacity onPress={onPress} style={{... styles.mapPreview, ...styles.mapPreview}}>
      {location ? <Image style={styles.mapImage} surce={{uri: imagePreviewUrl}} /> : children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
})

export default MapPreview