export const GET_STATISTIC = 'GET_STATISTIC'
export const GET_STATISTIC_SUC = 'GET_STATISTIC_SUC'
export const SET_FILTERS = 'SET_FILTERS'

export interface IFormsType {
  duration?: [number, number]
  location?: number[]
  category?: string[]
}

export interface IGetStatisticSucAction {
  type: typeof GET_STATISTIC_SUC
  payload: {
    prev: {
      totalSalesAmount: number
      totalOrderCount: number
    }
    cur: {
      totalSalesAmount: number
      totalOrderCount: number
    }
    detail?: {
      id: number
      userId: number
      shopId: number
      salesAmount: number
      salesCategory: number
      productName: string
      createTime: number
      provinceId: number
    }[]
  }
}

export interface ISetFilterForms {
  type: typeof SET_FILTERS
  payload: IFormsType
}

export type PanelActionTypes = IGetStatisticSucAction | ISetFilterForms
