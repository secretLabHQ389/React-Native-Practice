import React from 'react'
import {
  View,
  //Button,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native'
import { Platform } from 'react-native-web'
import { HeaderButton } from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'
import Colors from '../constants/Colors'

const CustomHeaderButton = props => {
  return (
    <HeaderButton 
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
      />
  )
}

const styles = StyleSheet.create({

})

export default CustomHeaderButton