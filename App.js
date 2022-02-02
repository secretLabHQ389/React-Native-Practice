import React, {useState} from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
//import { useScreens } from 'react-native-screens'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ShopNavigator from './navigation/ShopNavigator'
//import { composeWithDevTools } from 'redux-devtools-extension'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
})

const store = createStore(rootReducer /*, composeWithDevTools() */)

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
      <ShopNavigator />
    </Provider>
  )
}

export default App