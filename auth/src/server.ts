import { createServer } from 'http'
import { logger } from '@bigoncloud/logger'
import { ServerError } from '@bigoncloud/errors'

import { PORT, NODE_ENV, ACCESS_TOKEN_SECRET } from './config'
import { app } from './app'
import './db'

const port = PORT || 3001
const server = createServer(app)

process.on('uncaughtException', (err: Error) => {
  logger.warn('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  throw new ServerError(err.message)
})

if (!ACCESS_TOKEN_SECRET) {
  throw new ServerError(
    'ACCESS_TOKEN_SECRET is not set. Please set token secret!',
  )
}

async function startServer() {
  try {
    await server.listen(port)
  } catch (err) {
    throw new ServerError(err.message)
  }
}

startServer()
  .then(() => logger.info(`Server running on port: ${port} env: ${NODE_ENV}`))
  .catch((err) => logger.error(err))

process.on('unhandledRejection', (err: Error) => {
  throw new ServerError(err.message)
})

process.on('SIGTERM', () => {
  logger.warn('👋 SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    logger.warn('💥 Process terminated!')
  })
})
