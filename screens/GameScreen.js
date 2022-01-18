import React, {
  useState, 
  useRef, 
  useEffect
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Flatlist
  // ScrollView
  // TouchableWithoutFeedback,
  // Keyboard
} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import defaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'
import { ScrollView } from 'react-native-web'
import BodyText from '../components/TitleText'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const renderListItem = (guess, numOfRound) => {
  return (
    <View key={Math.random()} style={styles.listItem}>
      <BodyText>Guess {numOfRound}:&nbsp;</BodyText>
      <BodyText>{guess}</BodyText>
    </View>
  )
}

//Flatlist version:
// const renderListItem = (listLength, itemData) => {
//   return (
//     <View key={Math.random()} style={styles.listItem}>
//       <BodyText>Guess {listLength - itemData.index}:&nbsp;</BodyText>
//       <BodyText>{itemData.item}</BodyText>
//     </View>
//   )
// }

const GameScreen = props => {
  const { userChoice, onGameOver } = props
  const initialGuess = generateRandomBetween(1, 100, userChoice)
  const [rounds, setRounds] = useState(0)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess/*.toString() for FlatList key */])
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < userChoice)
    || (direction === 'greater' && currentGuess > userChoice)) {
      Alert.alert('Don\t lie!', 'You know this is wrong!', 
        [{text: 'Sorry!', style: 'cancel'}]
      )
      return
    }
    if (direction === 'lower') {
      //generateRandomBetween(1, 100, userChoice)
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNumber)
    //setRounds(curRounds => curRounds + 1)
    setPastGuesses(curPastGuesses => [nextNumber/* .toString() for Flatlist key */, ...curPastGuesses])
  }
  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card stylesProps={styles.buttonContainer}>
        <MainButton onPressProp={nextGuessHandler.bind(this, 'lower')}>
          LOWER <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPressProp={nextGuessHandler.bind(this, 'greater')}>
          GREATER <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses && pastGuesses.map((guess, index) => (
            renderListItem(guess, pastGuesses.length - index)
          ))}
        </ScrollView>
        {/* <Flatlist 
          keyExtractor={item => item} 
          data={pastGuesses} 
          renderItem={renderListItem.bind(this, pastGuesses.length)} 
          contentContainerStyle={styles.list}
          /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    width: '80%',
    height: 'fit-content'
  },
  list: {
    // flexGrow: 1,
    alignItems: 'center'
    // justifyContent: 'flex-end'
  },
  listItem: {
    margin: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 2,
    flexDirection: 'row'
  }
})

export default GameScreen