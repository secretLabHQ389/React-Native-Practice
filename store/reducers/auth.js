import { LOGIN, SIGNUP, LOGOUT } from '../actions/auth'

const initialState = {
  token: null,
  useId: null
}

export default (state = initialState, action) => {
  switch (action.type) {
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
      return initialState
    default: {
      return state
    }
  }
}