import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity
} from 'react-native' 

const GoalItem = props => {
  const {goal, onDelete} = props

  return (
    <TouchableOpacity onPress={onDelete}>
      <View key={goal.key} style={styles.listItem}>
        <Text>{goal.value}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default GoalItem

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ccc',
    color: 'black',
    border: '1px solid black',
    borderRadius: 10
  }
})