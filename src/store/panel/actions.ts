import { GET_STATISTIC, IFormsType, SET_FILTERS } from './type'

export const getStatistic = (forms: IFormsType) => ({
  type: GET_STATISTIC,
  payload: forms
})

export const setFilters = (forms: IFormsType) => ({
  type: SET_FILTERS,
  payload: forms
})
