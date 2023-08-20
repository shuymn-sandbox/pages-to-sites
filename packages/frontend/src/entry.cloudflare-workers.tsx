import qwikCityPlan from '@qwik-city-plan'
import { manifest } from '@qwik-client-manifest'
import { serveStatic } from 'hono/cloudflare-workers'

import render from './entry.ssr'
import { qwikMiddleware } from './middleware/cloudflare-workers'
import app from '../../backend/src'

app.get('*', qwikMiddleware({ render, qwikCityPlan, manifest }))
app.get('*', serveStatic({ root: './' }))

app.showRoutes()

export default app
