import React from 'react'
import {
  View,
  //Button,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native'
import { TouchableOpacity } from 'react-native-web'

const MealItem = props => {
  const {
    onSelectMeal, 
    title, 
    duration,
    complexity,
    affordability,
    image
  } = props
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={onSelectMeal}>
        <View>
          <View style={{...styles.mealRow, ...styles.mealHeader}}>
            <ImageBackground
              source={{uri: image}}
              style={styles.bgImage}
              >
            <View style={styles.titlwContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
            </ImageBackground>
          </View>
          <View style={{...styles.mealRow, ...styles.mealDetail}}>
            <Text>{duration}m</Text>
            <Text>{complexity.toUpperCase()}</Text>
            <Text>{affordability}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mealItem: {
    marginVertical: 10,
    height: 350,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden'
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%'
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  bgImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end'
  },
  titlwContainer: {
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})

export default MealItem