import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AppState } from 'store'
import { login, register, setLoading } from 'store/user/actions'
import { LocalStorage } from 'utils'

const mapDispatch = {
  register,
  login,
  setLoading
}

const mapState = ({ user }: AppState) => ({
  user
})

interface OwnProps {
  loginType: 'login' | 'register'
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & OwnProps

const UserForm: React.FC<Props> = ({
  register,
  login,
  setLoading,
  loginType,
  user: { loading, userId, username }
}) => {
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    setLoading(true)

    const { username, password } = values

    if (loginType === 'login') {
      login({
        username,
        password
      })
    } else {
      register({
        username,
        password
      })
    }

    form.setFieldsValue({ username: '', password: '' })
  }

  useEffect(() => {
    if (userId !== '' && username !== '') {
      LocalStorage.set('username', username)
      LocalStorage.set('userId', userId)
    }
  }, [userId, username])

  return (
    <Form
      onFinish={onFinish}
      form={form}
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Form.Item
        name="username"
        style={{ width: '300px' }}
        rules={[
          { required: true, message: 'Please enter your account name.' },
          (loginType === 'register' && {
            min: 8,
            message: 'Account name must be at least 8 characters long'
          }) ||
            {}
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="account name" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="password"
        style={{ width: '300px' }}
        rules={[
          { required: true, message: 'Please enter your password.' },
          (loginType === 'register' && {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            message:
              'The password must contain both uppercase and lowercase letters and be more than 8 characters long.'
          }) ||
            {}
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="password" />
      </Form.Item>
      <Form.Item>
        <Button style={{ textAlign: 'center' }} type="primary" htmlType="submit" loading={loading}>
          {loginType}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connector(UserForm)
