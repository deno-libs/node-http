import * as http from 'https://deno.land/std@0.99.0/http/server.ts'
import { EventEmitter } from 'https://deno.land/x/event@2.0.0/mod.ts'

import { getFreePort } from 'https://deno.land/x/free_port@v1.2.0/mod.ts'

type Events = {
  error: [Error]
  listening: []
  request: [http.ServerRequest]
  close: []
}

export type ServerHandler = (req: http.ServerRequest) => void

/**
 * Ported from `net.AddressInfo`
 */
export type AddressInfo = {
  family: string
  address: string
  port: number
}

export class Server extends EventEmitter<Events> {
  #server?: http.Server
  handler?: ServerHandler

  constructor(handler?: ServerHandler) {
    super()
    this.handler = handler
  }

  async listen(addr?: string | http.HTTPOptions) {
    if (!addr) addr = { port: await getFreePort(3000) }

    try {
      this.#server = http.serve(addr)
    } catch (e) {
      this.emit('error', e)
      throw e
    }

    this.emit('listening')

    try {
      for await (const req of this.#server!) {
        this.emit('request', req)
        this.handler?.(req)
      }
    } catch (e) {
      this.emit('error', e)
      throw e
    }

    return this.#server
  }
  address(): string | AddressInfo {
    const unixAddr = this.#server?.listener.addr as Deno.UnixAddr
    const netAddr = this.#server?.listener.addr as Deno.NetAddr

    if (unixAddr?.path) return unixAddr.path
    else return { family: 'IPv4', address: netAddr.hostname, port: netAddr.port }
  }
  close() {
    this.#server?.close()
    this.emit('close')
  }
}

export const createServer = (handler?: ServerHandler) => new Server(handler)
