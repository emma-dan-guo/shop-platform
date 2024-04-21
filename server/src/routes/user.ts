import crypto from 'crypto'
import Router from 'koa-router';
import { prisma } from '../db'

// Function to generate a random salt
function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex')
}

// Function to generate a hashed password using SHA-256 and salt
function generateHashedPassword(password: string, salt: string) {
  return crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex')
}

export const userRouter = new Router({
  prefix: '/api/v1/user'
})

userRouter.post('/status', async (ctx) => {
  const { userId, username } = ctx.request.body as any
  console.log('===userId', Number(userId), username)
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: username,
        id: Number(userId)
      }
    })
    ctx.status = 200
    ctx.body = {
      result: 1,
      data: {
        isLogin: user?.id !== undefined,
        userInfo: {
          userId: user?.id,
          username: user?.name
        }
      }
    }
  } catch (error) {
    console.log('error in status', error)
    ctx.status = 200
    ctx.body = {
      result: 1000,
      data: {
        isLogin: false
      }
    }
  }
})
userRouter.post('/login', async (ctx) => {
  const { password, username } = ctx.request.body as any
  const user = await prisma.user
    .findUnique({
      where: {
        name: username
      }
    })
    .catch((err) => undefined)

  // check password first
  if (user?.id) {
    ctx.status = 200
    if (generateHashedPassword(password, user?.salt) === user?.password) {
      ctx.body = {
        result: 1,
        data: {
          isLogin: true,
          userInfo: {
            userId: user.id,
            username: user.name
          }
        }
      }
    } else {
      ctx.body = {
        result: 1000,
        msg: 'the password is wrong, please try again!',
        data: {
          isLogin: false
        }
      }
    }
  } else {
    ctx.status = 200
    ctx.body = {
      result: 1001,
      data: {
        isLogin: false
      },
      msg: 'you have not registered yet. Please register first before logging in.'
    }
  }
})

userRouter.post('/register', async (ctx) => {
  const { password, username } = ctx.request.body as any
  try {
    const salt = generateSalt()
    const user = await prisma.user.create({
      data: {
        name: username,
        password: generateHashedPassword(password, salt),
        salt: salt
      }
    })
    ctx.header['set-cookie'] = [`userId=${user.id}`]
    ctx.status = 200
    ctx.body = {
      result: 1,
      data: {
        isSuccess: true,
        userInfo: {
          userId: user.id,
          username: user.name
        }
      },
      msg: 'register success!'
    }
  } catch (error) {
    ctx.status = 200
    if (error.message.indexOf('Unique constraint') > -1) {
      ctx.body = {
        result: 1000,
        msg: 'username must be unique! please try again'
      }
    } else {
      ctx.body = {
        result: 1001,
        msg: 'register error'
      }
    }
  }
})
