import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Platform
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
    backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? 'white' : 'black',
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  }
})

export default Header