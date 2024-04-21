import { Card, Table } from 'antd'
import styles from './index.module.scss'
import { FC, useMemo } from 'react'

import { getStatistic, setFilters } from '../../store/panel/actions'
import { ConnectedProps, connect } from 'react-redux'
import { AppState } from 'store'

const mapState = ({ panel }: AppState) => ({
  statistic: (panel as any).statistic
})

const connector = connect(mapState, {
  setFilters,
  getStatistic
})
type PropsFromRedux = ConnectedProps<typeof connector>

const DownloadCard: FC<PropsFromRedux> = ({ statistic }) => {
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
  const columns = useMemo(() => {
    return (
      Object.keys(formatDetailList?.[0] ?? {})?.map((i) => ({
        title: i,
        dataIndex: i,
        key: i
      })) ?? []
    )
  }, [formatDetailList])
  return (
    <Card style={{ margin: '12px' }} className={styles.wrapper} title="Sales Detail">
      {formatDetailList.length > 0 && <Table columns={columns} dataSource={formatDetailList} />}
    </Card>
  )
}

export default connector(DownloadCard)
