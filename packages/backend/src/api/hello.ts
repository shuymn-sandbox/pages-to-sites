import { Hono } from 'hono'

export const hello = new Hono()

hello.get('/', (c) => c.json({ message: 'hello' }))
