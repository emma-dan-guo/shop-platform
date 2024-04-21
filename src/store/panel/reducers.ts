import { PanelActionTypes } from './type'

export const DAY = 24 * 60 * 60 * 1000

const initialState = {
  statistic: {
    prev: {
      totalSalesAmount: 0,
      totalOrderCount: 0
    },
    cur: {
      totalSalesAmount: 0,
      totalOrderCount: 0
    }
  },
  forms: {
    duration: [Date.now() - 30 * DAY, Date.now()],
    location: [],
    category: []
  }
}
export default function userReducer(state = initialState, action: PanelActionTypes) {
  switch (action.type) {
    case 'GET_STATISTIC_SUC': {
      return {
        ...state,
        statistic: action.payload
      }
    }
    case 'SET_FILTERS': {
      return {
        ...state,
        forms: {
          ...state.forms,
          ...action.payload
        }
      }
    }
    default:
      return state
  }
}
