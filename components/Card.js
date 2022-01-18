import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const Card = props => {
  const {stylesProps} = props
  return (
    <View style={{...styles.card, ...stylesProps}}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    // padding: 20,
    // width: 300,
    // maxWidth: '80%',
    // alignItems: 'center',
    // backgroundColor: 'white',
    // borderRadius: 10,

    //only iOS:
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    //only Android:
    elevation: 5
  }
})

export default Card