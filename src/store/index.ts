import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../saga'
import userReducer from './user/reducers'
import panelReducer from './panel/reducers'

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({ user: userReducer, panel: panelReducer })

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

sagaMiddleware.run(rootSaga)
