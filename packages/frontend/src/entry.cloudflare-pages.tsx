import qwikCityPlan from '@qwik-city-plan'
import { manifest } from '@qwik-client-manifest'

import render from './entry.ssr'
import { qwikHandler } from './middleware/cloudflare-pages'
import app from '../../backend/src'

//@ts-ignore
app.get('*', qwikHandler({ render, qwikCityPlan, manifest }))

const fetch = app.fetch

export { fetch }
