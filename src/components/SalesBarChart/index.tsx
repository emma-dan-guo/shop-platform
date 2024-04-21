import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Col } from 'antd'
import styles from './index.module.scss'

export const SalesBarChart: React.FC = () => {
  return (
    <Col span={48}>
      <ReactECharts
        style={{ height: 500 }}
        notMerge={true}
        option={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'SSS']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [
                120,
                {
                  value: 300,
                  itemStyle: {
                    color: '#a90000'
                  }
                },
                150,
                80,
                70,
                110,
                130,
                200
              ],
              type: 'bar'
            },
            {
              data: [
                120,
                {
                  value: 300,
                  itemStyle: {
                    color: '#a90000'
                  }
                },
                150,
                80,
                70,
                110,
                130,
                200
              ],
              type: 'line',
              smooth: true
            }
          ]
        }}
        lazyUpdate={true}
      />
      <div className={styles.desc}>相关说明</div>
    </Col>
  )
}
