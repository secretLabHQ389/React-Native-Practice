import React, { useState } from 'react'
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Button,
  Modal
} from 'react-native' 

const GoalInput = props => {
  const { addGoalHandler, visible, cancelHandler } = props
  const [enteredGoal, setEnteredGoal] = useState('')

  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText)
  }

  const goalAddHandler = () => {
    addGoalHandler(enteredGoal)
    setEnteredGoal('')
  }

  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.form}>
        <TextInput 
          placeholder='Course goal'
          style={styles.inputs}
          onChangeText={goalInputHandler}
          value={enteredGoal}
          />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='CANCEL' color='red' onPress={cancelHandler} />
          </View>
          <View style={styles.button}>
            <Button title='ADD' onPress={goalAddHandler} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default GoalInput

const styles = StyleSheet.create({
  inputs: {
    marginBottom: '10px',
    width: '200px'
  },
  form: {
    // flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%'
  }
  // button: {
  //   width: '90%'
  // }
})