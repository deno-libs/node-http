import { describe, expect, it, run } from 'https://deno.land/x/tincan@0.2.1/mod.ts'
import { createServer } from './mod.ts'
import { makeFetch } from 'https://deno.land/x/superfetch@0.0.9/mod.ts'

describe('node_http', () => {
  it('should start the server', async () => {
    const s = createServer((req) => req.respond({ body: 'Hello' }))

    const fetch = makeFetch(s.handler!)

    await fetch('/').expect('Hello')
  })
  describe('events', () => {
    it('should trigger "listening" event', async () => {
      const s = createServer()

      s.on('listening', () => {
        expect(s.address()).toEqual({ family: 'IPv4', address: '0.0.0.0', port: 8080 })
        s.close()
      })

      await s.listen({ port: 8080 })
    })
    it('should trigger "request" event', async () => {
      const s = createServer()

      s.on('request', (req) => {
        expect(req.url).toBe('/')
        req.respond({ body: 'hello' })
      })

      const fetch = makeFetch(s)

      await fetch('/').expect('hello')
    })
  })
})

run()
