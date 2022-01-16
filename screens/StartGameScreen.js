import React, {useState} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
  // TouchableWithoutFeedback,
  // Keyboard
} from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('')
  const [confirmed, seConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setEnteredValue('')
    seConfirmed(false)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (chosenNumber === NaN 
      || chosenNumber <= 0
      || chosenNumber > 99) {
      return
    }
    seConfirmed(true)
    setEnteredValue('')
    setSelectedNumber(parseInt(enteredValue))
  }

  let confirmedOutput

  if (confirmed) {
    confirmedOutput = <Text>Chosen Number: {selectedNumber}</Text>
  }

  return (
    // <TouchableWithoutFeedback onPress={() => {
    //   Keyboard.dismiss()
    // }}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card stylesProps={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input 
            stylesProps={styles.input} 
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboard='numeric'
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
            />
          <View style={styles.buttonContainer}>
            <View style={styles.button}><Button title='Reset' onPress={() => resetInputHandler()} color={Colors.accent} /></View>
            <View style={styles.button}><Button title='Confirm' onPress={() => confirmInputHandler()} color={Colors.primary} /></View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    // </TouchableWithoutFeedback>
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
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center'
  }
})

export default StartGameScreen