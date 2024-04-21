/*
 * This file to route detailed order and order-related information.
 */
import { Context } from 'koa'
import { gql } from 'apollo-server-koa'
import Router from 'koa-router'
import { prisma } from '../db'
import { SalesShopInfo } from '@prisma/client'

export const orderRouter = new Router({
  prefix: '/api/v1/business'
})

orderRouter.get('/shop', async (ctx) => {
  // params:
  //   page: for paging
  // response:
  //   {data: records of shop information,
  //    meta: paging information}

  //// todo: add authorization!

  const page = parseInt(ctx.query.page as string) || 1 // Get page number from query params, default to 1
  const pageSize = 10 // Number of records per page

  // Calculate skip value for pagination
  const skip = (page - 1) * pageSize

  try {
    // Fetch records from your Prisma model
    const records = await prisma.salesShopInfo.findMany({
      take: pageSize, // Number of records to take
      skip: skip, // Number of records to skip
      orderBy: { id: 'asc' } // ordering by id
    })

    // Count total number of records
    const totalCount = await prisma.salesShopInfo.count()

    // Calculate total number of pages
    const totalPages = Math.ceil(totalCount / pageSize)

    // Response
    ctx.body = {
      data: records,
      meta: {
        page: page,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages
      }
    }
  } catch (error) {
    console.error('Error fetching records:', error)
    ctx.status = 500
    ctx.body = { error: 'Internal server error' }
  }
})

orderRouter.get('/order', async (ctx) => {
  // params:
  //   page: for paging
  // response:
  //   {data: records of shop information,
  //    meta: paging information}

  //// todo: add authorization!

  const page = parseInt(ctx.query.page as string) || 1 // Get page number from query params, default to 1
  const pageSize = 10 // Number of records per page

  // Calculate skip value for pagination
  const skip = (page - 1) * pageSize

  try {
    // Fetch records from your Prisma model
    const records = await prisma.salesOrder.findMany({
      take: pageSize, // Number of records to take
      skip: skip, // Number of records to skip
      orderBy: { id: 'asc' } // ordering by id
    })

    // Count total number of records
    const totalCount = await prisma.salesOrder.count()

    // Calculate total number of pages
    const totalPages = Math.ceil(totalCount / pageSize)

    // Response
    ctx.body = {
      data: records,
      meta: {
        page: page,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages
      }
    }
  } catch (error) {
    console.error('Error fetching records:', error)
    ctx.status = 500
    ctx.body = { error: 'Internal server error' }
  }
})

// Define our GraphQL schema for business tables
export const typeDefs = gql`
  type Query {
    shops(category: Int, locationLatitude: Float, locationLongitude: Float): [Shop!]!
    orders(id: Int, shopId: Int, userId: Int): [Order!]!
  }

  type Shop {
    id: Int!
    shopName: String!
    category: Int!
    locationLatitude: Float!
    locationLongitude: Float!
  }

  type Order {
    id: Int!
    shopId: Int!
    userId: Int!
  }
`

// Define input types
interface ShopsFilter {
  category?: number
  locationLatitude?: number
  locationLongitude?: number
}

interface OrdersFilter {
  id?: number
  shopId?: number
  userId?: number
}

// Define the GraphQL resolvers
export const resolvers = {
  Query: {
    shops: async (_: any, { category, locationLatitude, locationLongitude }: ShopsFilter) => {
      // Construct the filter object based on provided parameters
      const filter: any = {}
      if (category !== undefined) filter.category = category
      if (locationLatitude !== undefined) filter.locationLatitude = locationLatitude
      if (locationLongitude !== undefined) filter.locationLongitude = locationLongitude

      // Fetch shops from Prisma using the constructed filter
      return prisma.salesShopInfo.findMany({ where: filter })
    },
    orders: async (_: any, { id, shopId, userId }: OrdersFilter) => {
      // very important! userId must be got automatically!
      // !!!
      const filter: any = {}
      if (id !== undefined) filter.id = id
      if (shopId !== undefined) filter.shopId = shopId
      if (userId !== undefined) filter.userId = userId

      return prisma.salesOrder.findMany({
        where: filter
      })
    }
  }
}
