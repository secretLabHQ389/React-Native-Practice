import React from 'react'
import {
  Text,
  StyleSheet
} from 'react-native'

const BodyText = props => {
  const { children } = props
  return (
    <Text style={styles.body}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans'
  }
})

export default BodyText