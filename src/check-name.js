import axios from 'axios'
import Syncano from '@syncano/core'

export default async (ctx) => {
  const {response, logger} = new Syncano(ctx)
  const {debug} = logger('check-name')
  const url = `http://data.brreg.no/enhetsregisteret/api/enheter`

  try {
    const resp = await axios({
      url: url,
      params: {
        size:1,
        navn: ctx.args.name
      }
    })
    debug(resp.data)
    const company = resp.data._embedded.enheter;
    if (company.length && company[0].navn === ctx.args.name) {
      debug('Company found!')
      response.json({exist: true})
    } else {
      debug('Company doesn\'t exist!')
      response.json({exist: false})
    }
  } catch (err) {
    response.json({msg: err.message}, 400)
  }
}
