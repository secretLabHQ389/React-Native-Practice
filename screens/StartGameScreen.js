import React, {useState, useEffect} from 'react'
import {
  View,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions //gets current viewport width
  // TouchableWithoutFeedback,
  // Keyboard
} from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('')
  const [confirmed, seConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)
  const {onStartGame} = props

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimension.get('window').width / 4)
    }
    Dimensions.addEventListener('change', updateLayout)
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  }, [])

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setEnteredValue('')
    seConfirmed(false)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) 
      || chosenNumber <= 0
      || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number between 1 and 99 required.', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
      return
    }
    seConfirmed(true)
    setEnteredValue('')
    setSelectedNumber(parseInt(enteredValue))
  }

  let confirmedOutput

  if (confirmed) {
    confirmedOutput = (
      <Card stylesProps={styles.summaryContainer}>
        <TitleText>You selected:</TitleText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPressProp={() => onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    )
  }

  return (
    // <TouchableWithoutFeedback onPress={() => {
    //   Keyboard.dismiss()
    // }}>
    <ScrollView>
      <KeyboardAvoidingView 
        behavior='position'
        keyboardVerticalOffset={30}
        >
        <View style={styles.screen}>
          <TitleText style={styles.title}>Start a New Game!</TitleText>
          <Card stylesProps={styles.inputContainer}>
            <TitleText style={styles.title}>Select a Number</TitleText>
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
              <View style={{width: buttonWidth}}><Button title='Reset' onPress={() => resetInputHandler()} color={Colors.accent} /></View>
              <View style={{width: buttonWidth}}><Button title='Confirm' onPress={() => confirmInputHandler()} color={Colors.primary} /></View>
            </View>
          </Card>
          {confirmedOutput}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    fontSize: 20,
    fontFamily: 'open-sans-bold'
  },
  inputContainer: {
    padding: 20,
    // width: 300,
    // maxWidth: '80%',
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
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
  // button: {
  //   //width: 100
  //   //only checks on render, if rotate device doesnt recalculate:
  //   width: Dimensions.get('window').width / 4
  // },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
})

export default StartGameScreen