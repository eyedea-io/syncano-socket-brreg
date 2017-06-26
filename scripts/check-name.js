import axios from 'axios'
import {response, logger} from 'syncano-server'


const {debug} = logger('check-name')
const url = `http://data.brreg.no/enhetsregisteret/enhet.json`

axios({
  url: url,
  params: {
    size: 1,
    '$filter': `navn eq '${ARGS.name}'`
  }
})
  .then((resp) => resp.data)
  .then((data) => {
    debug(data)
    if (data.data) {
      response.json({exist: true})
    } else {
      response.json({exist: false})
    }
  })
