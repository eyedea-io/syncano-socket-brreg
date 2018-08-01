# Syncano Socket for integration with the Brønnøysund Register Centre API

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-brreg/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-brreg/tree/master)
![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-brreg/master.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/brreg.svg)](https://www.npmjs.com/package/@eyedea-sockets/brreg)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-brreg.svg)

Main Socket features:

* **brreg/check-name** — check if the given company name exist
* **brreg/get** — get company by org number

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/brreg --save
npx s deploy
```

Use it:

```js
import Syncano from '@syncano/client'

const s = new Syncano(<instaneName>)

// Search for a user
const params = {
  orgNumber: 915642349
}
const company = await s.get('brreg/get', params)
```
