import { takeEvery } from 'redux-saga/effects'

import { login, logout, register, checkLoginStatus } from './store/user/saga'
import { statistic } from './store/panel/saga'
import { CHECK_STATUS, LOGIN, LOGOUT, REGISTER } from './store/user/types'
import { GET_STATISTIC } from './store/panel/type'

function* rootSaga() {
  yield takeEvery(LOGIN, login)
  yield takeEvery(LOGOUT, logout)
  yield takeEvery(CHECK_STATUS, checkLoginStatus)
  yield takeEvery(REGISTER, register)
  yield takeEvery(GET_STATISTIC, statistic)
}

export default rootSaga
