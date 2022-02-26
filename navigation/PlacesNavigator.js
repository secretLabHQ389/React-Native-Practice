import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import PlacesListScreen from '../screens/PlacesListScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import MapScreen from '../screens/MapScreen'
import Color from '../constants/Colors'
import Colors from '../constants/Colors'

const PlacesNavigator = createStackNavigator({
  Places: PlacesListScreen,
  PlaceDetail: PlaceDetailScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTintColor: Colors.primaryColor
  }
})

export default createAppContainer(PlacesNavigator)