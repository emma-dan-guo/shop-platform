import {
  IAuthState,
  LOGIN,
  REGISTER,
  LOGOUT,
  KEEP_LOGIN,
  IUserState,
  SET_LOADING,
  CHECK_STATUS
} from './types'

export const login = (authState: IAuthState) => ({
  type: LOGIN,
  payload: authState
})

export const register = (authState: IAuthState) => ({
  type: REGISTER,
  payload: authState
})

export const logout = () => ({
  type: LOGOUT
})

export const checkLoginStatus = (userState: Partial<IUserState>) => ({
  type: CHECK_STATUS,
  payload: userState
})

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: { loading }
})
