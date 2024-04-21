import PanelAPI from 'api/panel'
import { GET_STATISTIC_SUC } from './type'
import { call, put } from 'redux-saga/effects'

export function* statistic(action) {
  try {
    const res: any = yield call(PanelAPI.statistic, action.payload)
    yield put({
      type: GET_STATISTIC_SUC,
      payload: res
    })
  } catch {}
}
