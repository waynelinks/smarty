import 'express-async-errors'
import express from 'express'
import { middleware, notFound, errorHandler } from '@bigoncloud/middleware'

const app = express()

middleware(app, express)

notFound(app)
app.use(errorHandler)

export { app }
