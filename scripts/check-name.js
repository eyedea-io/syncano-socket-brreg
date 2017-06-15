import axios from 'axios'
import {response} from 'syncano-server'


const url = `http://data.brreg.no/enhetsregisteret/enhet.json`

console.log(ARGS)

axios({
  baseURL: url,
  method: 'get',
  params: {
    size: 1,
    '$filter': `startswith(navn,'${ARGS.name}')`
  }
})
  .then((resp) => resp.data)
  .then((data) => {
    if (data.data) {
      response.json({exist: true})
    } else {
      response.json({exist: false})
    }
  })
