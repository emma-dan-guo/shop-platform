import UserForm from 'components/UserForm'
import { FC, useState } from 'react'

import styles from './index.module.scss'

const Login: FC = () => {
  const [loginType, setLoginType] = useState<'login' | 'register'>('login')

  const toggleForm = () => {
    const latestLoginType = loginType === 'login' ? 'register' : 'login'
    setLoginType(latestLoginType)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Data-Platform, login Now!</h1>
        <UserForm loginType={loginType} />
        <p className={styles.tip}>
          <span>Or&nbsp;&nbsp;</span>
          <span onClick={toggleForm}>
            {loginType === 'register' ? 'register now!' : 'have already account?'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
