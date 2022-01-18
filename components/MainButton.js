import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { TouchableOpacity } from 'react-native-web'
import Colors from '../constants/colors'

const MainButton = props => {
  const {children, onPressProp} = props
  return (
    <TouchableOpacity onPress={onPressProp}>
      <View style={styles.button}>
        <Text syle={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: Colors.primary,
    borderRadius: 25
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  }
})

export default MainButton