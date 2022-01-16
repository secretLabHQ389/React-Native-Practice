import React from 'react'
import { 
  StyleSheet,
  View
} from 'react-native'

//React 16.8 is the release of functional components

export default function App() {
  
  return (
    <View style={styles.container}>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
