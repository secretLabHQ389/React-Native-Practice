import { AUTHENTICATE, SET_DID_TRY_AL, LOGIN, SIGNUP, LOGOUT } from '../actions/auth'

const initialState = {
  token: null,
  useId: null,
  didTryAutoLogin: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.token,
        didTryAutoLogin: true
      }
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      }
    case LOGIN:
      return {
        token: action.token,
        userId: action.token
      }
    case SIGNUP:
      return {
        token: action.token,
        userId: action.token
      }
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      }
    default: {
      return state
    }
  }
}