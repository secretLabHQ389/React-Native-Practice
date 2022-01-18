import React, {useState} from 'react'
import { 
  StyleSheet,
  View
} from 'react-native'
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
import * as Font from 'expo-font'
//import { AppLoading } from 'expo'
//expo install expo-app-loading
import AppLoading from 'expo-app-loading'

//React 16.8 is the release of functional components

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)
  if (!dataLoaded) {
    return ( 
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)} 
        onError={(error) => console.log(error)}
        />
    )
  }
  const configureNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }
  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }
  let content = <StartGameScreen onStartGame={startGameHandler} />
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
  }
  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {/* <StartGameScreen onStartGame={startGameHandler} /> */}
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})
