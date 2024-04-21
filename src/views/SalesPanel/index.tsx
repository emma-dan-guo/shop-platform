import FilterWrapper from 'components/FilterWrapper'
import styles from './index.module.scss'
import TotalAmount from 'components/TotalAmount'
import { connect, type ConnectedProps } from 'react-redux'
import { AppState } from 'store'
import { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getStatistic } from '../../store/panel/actions'
import BarChartCard from 'components/BarChartCard'
import DownloadCard from 'components/DownloadCard'
import { Button } from 'antd/lib/radio'
import { message, Popover } from 'antd'
import request from 'api/request'

const mapState = ({ panel }: AppState) => ({
  statistic: (panel as any).statistic
})

const connector = connect(mapState, {
  getStatistic
})
type PropsFromRedux = ConnectedProps<typeof connector>

const SalesPanel: FC<RouteComponentProps & PropsFromRedux> = ({ statistic, getStatistic }) => {
  const handleManualUpdate = async () => {
    let isSuccess = false
    try {
      const res: any = await request.post('/data/update/order')
      isSuccess = res.result === 1
    } catch (error) {}
    message.info(isSuccess ? 'Mock update order success' : 'Mock update order fail')
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        Data-Platform
        <Popover content="You can simulate real-time data addition by clicking a button.">
          <Button type="ghost" className={styles.manualBtn} onClick={handleManualUpdate}>
            Manual Update Order
          </Button>
        </Popover>
      </div>
      <FilterWrapper />
      <div className={styles.gapLine}></div>
      <div className={styles.content}>
        <div className={styles.gapHeader}>1. Total Statistic Data Review</div>
        <TotalAmount />
        <div className={styles.gapHeader}>2. Data analysic</div>
        <BarChartCard />
        <DownloadCard />
      </div>
    </div>
  )
}

export default connector(SalesPanel)
