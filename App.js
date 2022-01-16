import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet,
  Text, 
  View, 
  Button, 
  TextInput,
  ScrollView
} from 'react-native'
import { FlatList } from 'react-native-web'
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

//React 16.8 is the release of functional components

export default function App() {
  const [state, setState] = useState('Open up App.js to start working on your app!')
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false)

  const changeText = input => {
    setState(input)
  }

  const addGoalHandler = title => {
    console.log(title)
    //mutating state:
    setCourseGoals(courseGoals => [...courseGoals, {
      key: Math.random().toString(),
      value: title
    }])
    setIsAddMode(false)
  }

  const removeGoalHandler = goalId => {
    console.log('courseGoals: ', courseGoals, ' goalId: ', goalId)
    setCourseGoals(courseGoals => {
      return courseGoals.filter(goal => goal.key !== goalId)
    })
  }

  const cancelHandler = () => {
    setIsAddMode(false)
  }
  
  return (
    // <View style={styles.container}>
    // <View style={{
      //padding: 15,
      //borderBottomColor: 'black',
      //borderBottomWidth: 1
    //}}>
    <View style={styles.body}>
      <Button title='Add new goal' onPress={() => setIsAddMode(true)} />
      {/* <View style={styles.form}>
        <TextInput 
          placeholder='Course goal'
          style={styles.inputs}
          onChangeText={goalInputHandler}
          value={enteredGoal}
          />
        <Button title='ADD' onPress={addGoalHandler} />
      </View> */}
      <GoalInput 
        visible={isAddMode} 
        addGoalHandler={addGoalHandler} 
        cancelHandler={cancelHandler}
        />
      <FlatList 
        keyExtractor={(item, index) => item.key}
        data={courseGoals} 
        renderItem={itemData => (
          // <View style={styles.listItem}>
          //   <Text>{itemData.item.value}</Text>
          // </View>
          <GoalItem goal={itemData.item} onDelete={() => removeGoalHandler(itemData.item.key)} />
        )}
        />
      <ScrollView>
        {courseGoals.map(goal => 
        <GoalItem goal={goal} onDelete={() => removeGoalHandler(goal.key)} />)}
      </ScrollView>
      <Text>{state}</Text>
      <StatusBar style="auto" />
      <Button title='Change Text' onPress={() => changeText('Text changed!')} />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    padding: '25px'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ccc',
    color: 'black',
    border: '1px solid black',
    borderRadius: 10
  }
});
