import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { hello } from './api/hello'

const app = new Hono()

// register middlewares
app.use('*', logger())

// register routes
app.route('/api/hello', hello)

export default app
