import React, {useState} from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
//import { useScreens } from 'react-native-screens'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import MealsNavigator from './navigation/MealsNavigator'
import mealsReducer from './store/reducers/meals'

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

const rootReducer = combineReducers({
  meals: mealsReducer
})

const store = createStore(rootReducer)

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false)
  if (!fontLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setFontLoaded(true)} 
        onError={err => console.log(err)}
        />
    )
  }
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  )
}

export default App