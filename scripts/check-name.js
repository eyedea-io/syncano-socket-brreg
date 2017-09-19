import axios from 'axios'
import Syncano from 'syncano-server'


const url = `http://data.brreg.no/enhetsregisteret/enhet.json`

export default function run(ctx) {
  const {response, logger} = Syncano(ctx)
  const {debug} = logger('check-name')

  return axios({
    url: url,
    params: {
      size: 1,
      '$filter': `navn eq '${ctx.args.name}'`
    }
  })
    .then((resp) => resp.data)
    .then((data) => {
      debug(data)
      if (data.data) {
        debug('Company found!')
        response.json({exist: true})
      } else {
        debug('Company doesn\'t exist!')
        response.json({exist: false})
      }
    })
    .catch(err => {
      response.json({msg: err.message}, 400)
    })
}
