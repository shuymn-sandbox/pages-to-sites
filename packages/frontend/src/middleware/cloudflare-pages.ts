import type { PlatformCloudflarePages } from '@builder.io/qwik-city/middleware/cloudflare-pages'
import { createQwikCity } from '@builder.io/qwik-city/middleware/cloudflare-pages'
import { type ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler'
import type { Handler } from 'hono'

export type Bindings = PlatformCloudflarePages['env'] & {
	ASSETS: {
		fetch: (req: Request) => Response
	}
}

export const qwikHandler = (opts: ServerRenderOptions): Handler<{ Bindings: Bindings }> => {
	const fetch = createQwikCity(opts)
	return async (c) => {
		return fetch(c.req.raw, c.env, c.executionCtx)
	}
}
