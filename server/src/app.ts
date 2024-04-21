import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import http from 'http'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import Config from './config'
import { connectDB } from './db'
import { dataRouter } from './routes/data'
import { userRouter } from './routes/user'
import { orderRouter, typeDefs, resolvers } from './routes/business'
import { DataWebSocket } from './utils/createWs'

// Initialize an original Koa instance
const app = new Koa()

// General RESTful API routes / controllers
app
  .use(cors())
  .use(bodyParser())
  .use(userRouter.routes())
  .use(orderRouter.routes())
  .use(dataRouter.routes())

// Create an Apollo Server instance
// Apply for GraphQL supports
const server = new ApolloServer({ typeDefs, resolvers })

// Apply the Koa middleware
async function startServer() {
  await server.start()
  server.applyMiddleware({ app })
}

// Make connection with relational database
connectDB()

// WebSocket handling
DataWebSocket.create()

const httpServer = http.createServer(app.callback())

// Start serving
startServer().then(() => {
  httpServer.listen(Config.PORT, () => {
    console.log(`server starts successful: http://localhost:${Config.PORT}`)
  })
})
