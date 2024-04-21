import styles from './index.module.scss'
import React, { useMemo } from 'react'
import { Row, Col, Statistic, Switch } from 'antd'
import { AppState } from 'store'
import { useEffect, FC } from 'react'
import { getStatistic } from '../../store/panel/actions'
import { ConnectedProps, connect } from 'react-redux'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

const mapState = ({ panel }: AppState) => ({
  statistic: (panel as any).statistic
})

const connector = connect(mapState, {
  getStatistic
})
type PropsFromRedux = ConnectedProps<typeof connector>

const TotalAmount: React.FC<PropsFromRedux> = ({ statistic, getStatistic }) => {
  useEffect(() => {
    getStatistic({})
  }, [])
  const diffInfo = useMemo(() => {
    const { prev, cur } = statistic
    const orderDiff = ((cur.totalOrderCount - prev.totalOrderCount) / prev.totalOrderCount).toFixed(
      2
    )
    const salesDiff = (
      (cur.totalSalesAmount - prev.totalSalesAmount) /
      prev.totalSalesAmount
    ).toFixed(2)
    return {
      order: {
        type: Number(orderDiff) > 0 ? 'positive' : 'negative',
        amount: orderDiff
      },
      sales: {
        type: Number(salesDiff) > 0 ? 'positive' : 'negative',
        amount: salesDiff
      }
    }
  }, [statistic])
  return (
    <div className={styles.amountWrapper}>
      <Row gutter={50}>
        <Col span={12}>
          <Statistic
            title="All orderAmount"
            value={statistic.cur.totalOrderCount}
            suffix={
              <span className={styles.detail}>
                {diffInfo.order.amount}%
                {diffInfo.sales.type === 'positive' ? (
                  <ArrowUpOutlined style={{ color: '#3f8600' }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#cf1322' }} />
                )}
              </span>
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Sales Balance (CNY)"
            style={{ whiteSpace: 'nowrap' }}
            value={statistic.cur.totalSalesAmount}
            precision={2}
            suffix={
              <span className={styles.detail}>
                {diffInfo.sales.amount}%
                {diffInfo.sales.type === 'positive' ? (
                  <ArrowUpOutlined style={{ color: '#3f8600' }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#cf1322' }} />
                )}
              </span>
            }
          />
        </Col>
      </Row>
    </div>
  )
}

export default connector(TotalAmount)
