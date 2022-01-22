import React from 'react'
import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList
} from 'react-native'
import {
  Platform, 
  TouchableNativeFeedback, 
  TouchableOpacity
} from 'react-native-web'

const CategoryGridTile = props => {
  const {onSelect, color, title} = props
  let TouchableCmp = TouchableOpacity
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp onPress={onSelect}>
        <View style={{...styles.container, ...{backgroundColor: color}}}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </View>
      </TouchableCmp>
    </View>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    margin: 15,
    flex: 1,
    height: 150,
    borderRadius: 10,
    overflow: Platform.OS === 'android' && Platform.OS >= 21 ? 'hidden' : 'visible' //hides shadows
  },
  container: {
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadoOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right'
  }
})

export default CategoryGridTile