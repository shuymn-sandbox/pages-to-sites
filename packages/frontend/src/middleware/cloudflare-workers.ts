import { _deserializeData, _serializeData, _verifySerializable } from '@builder.io/qwik'
import type { ServerRenderOptions, ServerRequestEvent } from '@builder.io/qwik-city/middleware/request-handler'
import { mergeHeadersCookies, requestHandler } from '@builder.io/qwik-city/middleware/request-handler'
import { setServerPlatform } from '@builder.io/qwik/server'
import type { MiddlewareHandler } from 'hono'

export const qwikMiddleware = (opts: ServerRenderOptions): MiddlewareHandler => {
	const qwikSerializer = {
		_deserializeData,
		_serializeData,
		_verifySerializable,
	}
	if (opts.manifest) {
		setServerPlatform(opts.manifest)
	}
	return async (c, next) => {
		const url = new URL(c.req.url)
		const serverRequestEv: ServerRequestEvent<Response> = {
			mode: 'server',
			locale: undefined,
			url,
			request: c.req.raw,
			env: c.env,
			getWritableStream: (status, headers, cookies, resolve) => {
				const { readable, writable } = new TransformStream()
				const response = new Response(readable, {
					status,
					headers: mergeHeadersCookies(headers, cookies),
				})
				resolve(response)
				return writable
			},
			getClientConn: () => {
				return {
					ip: c.req.raw.headers.get('CF-connecting-ip') || '',
					country: c.req.raw.headers.get('CF-IPCountry') || '',
				}
			},
			platform: {
				request: c.req.raw,
				env: c.env,
				ctx: c.executionCtx,
			},
		}
		const handledResponse = await requestHandler(serverRequestEv, opts, qwikSerializer)
		if (handledResponse) {
			handledResponse.completion.then((v) => {
				if (v) {
					console.error(v)
				}
			})
			const response = await handledResponse.response
			if (response) {
				return response
			}
		}
		await next()
	}
}
