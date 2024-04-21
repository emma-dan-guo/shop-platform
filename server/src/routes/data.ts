import Router from 'koa-router'
import { prisma } from '../db'
import { categoryIDs, getRandom, locationIDs } from './const'
import { DataWebSocket } from '../utils/createWs'

export const dataRouter = new Router({
  prefix: '/api/v1/data'
})
const DAY = 24 * 60 * 60 * 1000
// get All
dataRouter.post('/statistic', async (ctx) => {
  const timestamp = Date.now()
  const {
    duration = [timestamp - 30 * DAY, timestamp],
    category = [],
    location = []
  } = ctx.request.body as any
  const [createTime = timestamp - 30 * DAY, endTime = timestamp] = duration ?? []
  const tmp: any = {}
  if (category.length > 0) {
    tmp.salesCategory = {
      in: category
    }
  }
  if (location.length > 0) {
    tmp.provinceId = {
      in: location
    }
  }
  try {
    const [cur, prev] = await Promise.all([
      prisma.salesOrder.findMany({
        where: {
          ...tmp,
          createTime: {
            gte: new Date(createTime),
            lt: new Date(endTime)
          }
        }
      }),
      prisma.salesOrder.findMany({
        where: {
          ...tmp,
          createTime: {
            gte: new Date(createTime - DAY),
            lt: new Date(endTime - DAY)
          }
        }
      })
    ])

    ctx.status = 200
    ctx.body = {
      result: 1,
      data: {
        detail: cur,
        cur: {
          totalOrderCount: cur.length, // 订单数
          totalSalesAmount: cur.reduce((prev, cur) => prev + cur.salesAmount, 0) // 销售金额
        },
        prev: {
          totalOrderCount: prev.length,
          totalSalesAmount: prev.reduce((prev, cur) => prev + cur.salesAmount, 0) // 销售金额
        }
      }
    }
  } catch (error) {
    console.error('err in get statistic', error)
  }
})

dataRouter.post('/create/order', async (ctx) => {
  const leftDay = Number((Math.random() * 200).toFixed(0))
  const res = await prisma.salesOrder.create({
    data: {
      createTime: new Date(Date.now() - leftDay * DAY).toISOString(),
      salesAmount: Number((Math.random() * 100).toFixed(0)),
      userId: 1,
      provinceId: getRandom(locationIDs).id,
      shopId: getRandom([0, 1, 2, 3, 4, 5]),
      productName: getRandom(['A', 'B', 'C', 'D', 'E']),
      salesCategory: getRandom(categoryIDs).id
    }
  })
  ctx.status = 200
  if (res.id) {
    ctx.body = {
      result: 1,
      data: {
        create: true
      }
    }
  } else {
    ctx.body = {
      result: 1,
      data: {
        create: false
      }
    }
  }
})

dataRouter.post('/update/order', async (ctx) => {
  const res = await prisma.salesOrder.create({
    data: {
      createTime: new Date(Date.now()).toISOString(),
      salesAmount: Number((Math.random() * 100).toFixed(0)),
      userId: 1,
      provinceId: getRandom(locationIDs).id,
      shopId: getRandom([0, 1, 2, 3, 4, 5]),
      productName: getRandom(['A', 'B', 'C', 'D', 'E']),
      salesCategory: getRandom(categoryIDs).id
    }
  })
  ctx.status = 200
  if (res.id) {
    DataWebSocket.send('refresh')
    ctx.body = {
      result: 1,
      data: {
        create: true
      }
    }
  } else {
    ctx.body = {
      result: 1,
      data: {
        create: false
      }
    }
  }
})
