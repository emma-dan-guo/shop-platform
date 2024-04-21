import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const connectDB = (): void => {
  prisma.$connect()
}
