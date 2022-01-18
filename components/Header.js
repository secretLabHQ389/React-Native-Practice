import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Colors from '../constants/colors'
import TitleText from './TitleText'

const Header = props => {
  const {title} = props
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 36,
    width: '100%',
    height: 90,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  }
})

export default Header