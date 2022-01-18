import React from 'react'
import {
  Text,
  StyleSheet
} from 'react-native'

const BodyText = props => {
  const { children, styleProps } = props
  return (
    <Text style={{...styles.body, ...styleProps}}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
})

export default BodyText