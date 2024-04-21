import { FC, useEffect } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'

import { connect, ConnectedProps } from 'react-redux'
import { AppState } from 'store'
import { checkLoginStatus } from 'store/user/actions'
import { LocalStorage } from 'utils'

const mapState = ({ user }: AppState) => ({
  user
})

const connector = connect(mapState, {
  checkLoginStatus
})

type PropsFromRedux = ConnectedProps<typeof connector>

const Home: FC<RouteComponentProps & PropsFromRedux> = ({ user, checkLoginStatus }) => {
  useEffect(() => {
    const userId = LocalStorage.get('userId')
    const username = LocalStorage.get('username')
    if (userId && username && !user.userId) {
      checkLoginStatus({ userId, username })
    }
  }, [])

  return user.userId ? <Redirect to="/sales-panel" /> : <Redirect to="/login" />
}

export default connector(Home)
