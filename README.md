# node-http

[![][docs-badge]][docs]

Node.js-like HTTP server for Deno. Makes porting web things from Node (a little bit) easier.

## Example

```js
import { createServer } from 'https://deno.land/x/node_http/mod.ts'

const s = createServer((req) => req.respond({ body: 'Hello' }))

s.on('error', (err) => console.log(err))

s.on('listening', () => console.log(s.address()))

await s.listen({ port: 3000 })
```

[docs-badge]: https://img.shields.io/github/v/release/deno-libs/node_http?color=yellow&label=Documentation&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/node_http/mod.ts
