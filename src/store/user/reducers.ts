import {
  CHECK_STATUS_SUC,
  IUserState,
  LOGIN_SUC,
  LOGOUT_SUC,
  REGISTER_SUC,
  SET_LOADING,
  UserActionTypes
} from './types'

const initialState: IUserState = {
  userId: '',
  username: '',
  errMsg: '',
  loading: false
}

export default function userReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case REGISTER_SUC:
      return {
        ...state,
        ...action.payload
      }
    case LOGIN_SUC:
      return {
        ...state,
        ...action.payload
      }
    case LOGOUT_SUC:
      return initialState
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case CHECK_STATUS_SUC:
      return {
        ...state,
        ...(action.payload ?? {})
      }
    default:
      return state
  }
}
