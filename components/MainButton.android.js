import React from 'react'
import {
  View,
  Text,
  StyleSheet
  // Platform
} from 'react-native'
import { 
  Platform, 
  TouchableNativeFeedback, 
  TouchableOpacity 
} from 'react-native-web'
import Colors from '../constants/colors'

const MainButton = props => {
  const {children, onPressProp} = props
  let ButtonComponent = TouchableOpacity
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback
  }
  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={onPressProp}>
        <View style={styles.button}>
          <Text syle={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden'
  },
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