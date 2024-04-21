import { Card } from 'antd'
import styles from './index.module.scss'
import React, { FC, useEffect, useMemo } from 'react'
import ReactECharts from 'echarts-for-react'

import { RouteComponentProps } from 'react-router-dom'
import { getStatistic, setFilters } from '../../store/panel/actions'
import { ConnectedProps, connect } from 'react-redux'
import { AppState } from 'store'
import { groupBy } from 'lodash'
import { categoryIDs } from 'components/FilterWrapper/const'

const mapState = ({ panel }: AppState) => ({
  statistic: (panel as any).statistic
})

const downloadJson: Record<string, number> = {
  'echarts.min.js': 17365,
  'echarts.simple.min.js': 4079,
  'echarts.common.min.js': 6929,
  'echarts.js': 14890
}

const connector = connect(mapState, {
  setFilters,
  getStatistic
})
type PropsFromRedux = ConnectedProps<typeof connector>

export type SeriesType =
  | {
      type: 'bar'
      data: Array<
        | number
        | {
            value: number
            itemStyle: Record<string, string>
          }
      >
    }
  | {
      type: 'line'
      data: Array<
        | number
        | {
            value: number
            itemStyle: Record<string, string>
          }
      >
      smooth: boolean
    }
  | {
      type: 'pie'
      data: {
        name: string
        value: number
      }[]
      radius: [number | string, number | string]
      center: [number | string, number | string]
    }

const renderBarOptions = (params: { XAxisInfo: string; series: Array<SeriesType> }) => {
  const { XAxisInfo, series } = params
  return {
    xAxis: {
      type: 'category',
      data: XAxisInfo
    },
    yAxis: {
      type: 'value'
    },
    series
  }
}

const renderCircleOptions = (
  data: {
    name: string
    value: number
  }[]
) => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}

const BarChartCard: FC<PropsFromRedux> = ({ statistic }) => {
  const formatDetailList = useMemo(() => {
    return (
      statistic.detail?.sort((a, b) => {
        if (a.createTime > b.createTime) {
          return 1
        }
        if (a.createTime < b.createTime) {
          return -1
        }
        return 0
      }) ?? []
    )
  }, [statistic.detail])
  const XAxisInfo = useMemo(() => {
    return formatDetailList.map((i) => {
      const date = new Date(i.createTime)
      return `${date.getMonth()}-${date.getDate()}`
    })
  }, [formatDetailList])
  const series = useMemo<SeriesType[]>(() => {
    const barList: number[] = formatDetailList.map((i) => i.salesAmount)
    return [
      {
        type: 'bar',
        data: barList
      },
      {
        type: 'line',
        data: barList,
        smooth: true
      }
    ]
  }, [formatDetailList])
  const categoryList = useMemo(() => {
    const categoryMap = groupBy(formatDetailList, 'salesCategory')
    return Object.entries(categoryMap).map(([key, value]: [string, any]) => {
      return {
        name: categoryIDs.find((i) => i.id === Number(key))?.name ?? '',
        value: value.reduce((prev, cur) => prev + cur.salesAmount, 0)
      }
    })
  }, [formatDetailList])
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Card
        style={{ width: '60%' }}
        className={styles.wrapper}
        title="The Total Sales Amount Trend."
      >
        <ReactECharts
          style={{ height: 500 }}
          notMerge={true}
          option={renderBarOptions({ XAxisInfo, series })}
          lazyUpdate={true}
        />
      </Card>
      <Card style={{ width: '38%' }} title="The Ratio Of Category">
        <ReactECharts
          style={{ height: 500 }}
          notMerge={true}
          option={renderCircleOptions(categoryList)}
          lazyUpdate={true}
        />
      </Card>
    </div>
  )
}

export default connector(BarChartCard)
