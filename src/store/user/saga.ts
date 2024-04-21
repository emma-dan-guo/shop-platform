import UserAPI from 'api/user'
import { IRes } from 'common/interface'
import { call, put } from 'redux-saga/effects'
import { LocalStorage } from 'utils'

import {
  ICheckStatusAction,
  ILoginAction,
  IRegisterAction,
  LOGIN_SUC,
  LOGOUT_SUC,
  REGISTER_SUC,
  SET_LOADING,
  CHECK_STATUS_SUC
} from './types'

export function* login(action: ILoginAction) {
  const { username, password } = action.payload

  try {
    const res: any = yield call(UserAPI.login, username, password)
    yield put({
      type: LOGIN_SUC,
      payload: {
        username: res.userInfo.username,
        userId: res.userInfo.userId
      }
    })
    yield put({
      type: SET_LOADING,
      payload: { loading: false }
    })
  } catch {
    yield put({
      type: SET_LOADING,
      payload: { loading: false }
    })
  }
}

export function* checkLoginStatus(action: ICheckStatusAction): any {
  const { username, userId } = action.payload as any
  try {
    const resp = yield call(UserAPI.check, username, userId)
    let payload:
      | undefined
      | {
          userId: string
          username: string
        } = undefined
    if (resp.userInfo) {
      payload = {
        username: resp.userInfo.username,
        userId: resp.userInfo.userId
      }
    }
    yield put({
      type: CHECK_STATUS_SUC,
      payload
    })
  } catch {
    yield put({
      type: CHECK_STATUS_SUC,
      payload: {
        isLogin: false
      }
    })
  }
}

export function* logout() {
  try {
    yield call(LocalStorage.remove, 'userId')
    yield call(LocalStorage.remove, 'username')
    yield put({
      type: LOGOUT_SUC
    })
  } catch {}
}

export function* register(action: IRegisterAction): any {
  const { username, password } = action.payload

  try {
    const resp: any = yield call(UserAPI.register, username, password)
    LocalStorage.set('username', resp.userInfo?.username ?? '')
    LocalStorage.set('userId', resp.userInfo?.userId ?? '')
    yield put({
      type: REGISTER_SUC,
      payload: {
        userId: resp.userInfo.userId,
        username: resp.userInfo.username
      }
    })
    yield put({
      type: SET_LOADING,
      payload: { loading: false }
    })
  } catch {
    yield put({
      type: SET_LOADING,
      payload: { loading: false }
    })
  }
}
