import AsyncStorage from '@react-native-async-storage/async-storage'

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer

//can combine each type to this:
export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime))
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token
    })
  }
}

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCA9G-KBcDYSSiPG-7sGJcq956HrIUVtBs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json()
      console.log(errorResData)
      const errorId = errorResData.error.message

      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already'
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Password incorrect'
      }
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000).toDateString()
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCA9G-KBcDYSSiPG-7sGJcq956HrIUVtBs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json()
      console.log(errorResData)
      const errorId = errorResData.error.message

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found'
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Password incorrect'
      }
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000).toDateString()
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  };
}

export const logout = () => {
  clearLogoutTimer()
  //don't need return of fn so dont need thunk:
  AsyncStorage.removeItem('userData')
  return {
    type: LOGOUT
  }
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expireDate: expirationDate
  }))
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}