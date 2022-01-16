import React from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native'
import Card from '../components/Card'

const StartGameScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
          <Button title='Reset' onPress={() => {}} />
          <Button title='Confirm' onPress={() => {}} />
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    marginVertical: 10,
    fontSize: 20
  },
  inputContainer: {
    padding: 20,
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10
  },
  buttonContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  }
})

export default StartGameScreen