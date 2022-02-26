import * as FileSystem from 'expo-file-system'
import { insertPlace,fetchPlaces } from '../helpers/db'
export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'


export const addPlace = (title, image) => {
  return dispatch => {
    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      })
      const dbResult = await insertPlace(
        title, 
        newPath, 
        'Dummy address', 
        15.6, 
        12.3
      )
      console.log('dbResult: ', dbResult)
      dispatch({type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: newPath} })
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces()
      console.log(dbResult)
    } catch (err) {
      throw err
    }
    dispatch({type: SET_PLACES, places: dbResult.rows._array})
  }
}