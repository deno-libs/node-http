import * as http from 'https://deno.land/std@0.97.0/http/server.ts'
import { EventEmitter } from 'https://deno.land/x/event@1.0.0/mod.ts'

type Events = {
  error: [Error]
  listening: []
  request: [http.ServerRequest]
}

type Handler = (req: http.ServerRequest) => void

/**
 * Ported from `net.AddressInfo`
 */
export type AddressInfo = {
  family: string
  host: string
  port: number
}

export class Server extends EventEmitter<Events> {
  #server?: http.Server
  handler?: Handler

  constructor(handler: Handler) {
    super()
    this.handler = handler
  }

  async listen(addr: string | http.HTTPOptions) {
    try {
      this.#server = http.serve(addr)
    } catch (e) {
      this.emit('error', e)
    }

    this.emit('listening')

    try {
      for await (const req of this.#server!) {
        this.emit('request', req)
        this.handler?.(req)
      }
    } catch (e) {
      this.emit('error', e)
    }

    return this.#server
  }
  address(): string | AddressInfo {
    const unixAddr = this.#server?.listener.addr as Deno.UnixAddr
    const netAddr = this.#server?.listener.addr as Deno.NetAddr

    if (unixAddr.path) return unixAddr.path
    else return { family: 'IPv4', host: netAddr.hostname, port: netAddr.port }
  }
}

export const createServer = (handler: Handler) => new Server(handler)
