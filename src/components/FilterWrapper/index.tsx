import styles from './index.module.scss'
import { Col, DatePicker, Popover, Space, Select, type SelectProps, Button, Switch } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import { AppState } from 'store'
import { FC, useState } from 'react'
import { getStatistic, setFilters } from '../../store/panel/actions'
import { ConnectedProps, connect } from 'react-redux'
import { categoryIDs, locationIDs } from './const'
import { useDataWebSocket } from './useDataWebSocket'

const { RangePicker } = DatePicker

const mapState = ({ panel }: AppState) => ({
  forms: (panel as any).forms
})

const connector = connect(mapState, {
  setFilters,
  getStatistic
})
type PropsFromRedux = ConnectedProps<typeof connector>

const FilterWrapper: FC<PropsFromRedux> = ({ setFilters, getStatistic }) => {
  const [duration, setDuration] = useState<[number, number] | undefined>()
  const [categoryList, setCategory] = useState([])
  const [locationList, setLocation] = useState([])
  const { isRefreshOpen, setRefreshOpen } = useDataWebSocket(() => {
    getStatistic({
      duration: duration,
      category: categoryList,
      location: locationList
    })
  })
  const handleRangePickChange = (e) => {
    const duration: [number, number] = e.map((i) => i.valueOf())
    setDuration(duration)
  }
  const handleConfirm = () => {
    setFilters({
      duration: duration,
      category: categoryList,
      location: locationList
    })
    getStatistic({
      duration: duration,
      category: categoryList,
      location: locationList
    })
  }
  const handleReset = () => {
    setDuration(undefined)
    setCategory([])
    setLocation([])
  }
  return (
    <div className={styles.filterWrapper}>
      <Col span={6} className={styles.filterCol}>
        <Space size="middle" align="center">
          <span className={styles.filterTitle}>Choose Date:</span>
          <RangePicker style={{ width: '300px' }} onChange={handleRangePickChange} />
        </Space>
      </Col>
      <Col span={6} className={styles.filterCol}>
        <Space size="middle" align="center">
          <span className={styles.filterTitle}>Choose Category:</span>
          <Select
            mode="tags"
            value={categoryList}
            style={{ width: '300px' }}
            placeholder="Choose Category"
            onChange={(e) => setCategory(e)}
            options={categoryIDs.map((i) => ({ label: i.name, value: i.id }))}
          />
        </Space>
      </Col>
      <Col span={6} className={styles.filterCol}>
        <Space size="middle" align="center">
          <span className={styles.filterTitle}>Choose Location:</span>
          <Select
            mode="tags"
            value={locationList}
            style={{ width: '300px' }}
            placeholder="Choose Location"
            onChange={(e) => setLocation(e)}
            options={locationIDs.map((i) => ({ label: i.name, value: i.id }))}
          />
        </Space>
      </Col>
      <Col span={1} className={styles.filterCol}>
        <Button type="default" onClick={handleReset}>
          Reset
        </Button>
      </Col>
      <Col span={2} className={styles.filterCol}>
        <Button type="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Col>
      <Col span={1} style={{ verticalAlign: 'middle' }}>
        <Switch
          checkedChildren="open"
          unCheckedChildren="close"
          onChange={() => setRefreshOpen(!isRefreshOpen)}
        />
      </Col>
      <Popover content="if it is opened, it will be refresh the data in real-time ">
        <InfoCircleOutlined />
      </Popover>
    </div>
  )
}

export default connector(FilterWrapper)
