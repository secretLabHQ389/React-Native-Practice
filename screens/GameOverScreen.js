import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
  // TouchableWithoutFeedback,
  // Keyboard
} from 'react-native'
import Colors from '../constants/colors'
import BodyText from '../components/TitleText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
  const {roundsNumber, userNumber, onRestart} = props
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over</TitleText>
        <Image 
          fadeDuration={1000}
          style={styles.image} 
          source={require('../assets/favicon.png')}
          //source={{uri: 'link-to-image'}}
          resizeMode='container'
          />
        <View style={styles.resultContainer}>
          <BodyText>Number of Rounds: <Text style={styles.highlight}>{roundsNumber}</Text></BodyText>
          <BodyText>Number was: {userNumber}</BodyText>
        </View>
        <MainButton onPressProp={onRestart}>
          New Game
        </MainButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '80%',
    height: 300
  },
  resultContainer: {
    marginHorizontal: 20
  },
  highlight: {
    color: Colors.primary
  }
})

export default GameOverScreen