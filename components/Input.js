import React from 'react'
import {
  TextInput,
  StyleSheet
} from 'react-native'

const Input = props => {
  const {stylesProps} = props
  return (
    <TextInput {...props} style={{...styles.input, ...stylesProps}} />
  )
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  }
})

export default Input