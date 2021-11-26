<div align="center">

# node-http

[![GitHub Workflow Status][gh-actions-img]][github-actions] [![Coverage][cov-badge]][cov]

</div>

> ⚠️ **DEPRECATED!** Use [std/http](https://deno.land/std/node/http.ts) instead.

Node.js-like HTTP server for Deno. Makes porting web things from Node (a little bit) easier.

## Example

```js
import { createServer } from 'https://deno.land/x/node_http/mod.ts'

const s = createServer((req) => req.respond({ body: 'Hello' }))

s.on('error', (err) => console.log(err))

s.on('listening', () => console.log(s.address()))

await s.listen({ port: 3000 })
```

[docs-badge]: https://img.shields.io/github/v/release/deno-libs/node_http?color=yellow&label=Docs&logo=deno&style=for-the-badge
[docs]: https://doc.deno.land/https/deno.land/x/node_http/mod.ts
[gh-actions-img]: https://img.shields.io/github/workflow/status/deno-libs/node-http/CI?style=for-the-badge
[github-actions]: https://github.com/deno-libs/node-http/actions
[cov]: https://coveralls.io/github/deno-libs/node-http
[cov-badge]: https://img.shields.io/coveralls/github/deno-libs/node-http?style=for-the-badge
