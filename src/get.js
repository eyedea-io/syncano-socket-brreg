import axios from 'axios'
import Syncano from '@syncano/core'

export default (ctx) => {
  const {response, logger} = new Syncano(ctx)
  const {debug} = logger('get')
  const {orgNumber} = ctx.args
  const url = `http://data.brreg.no/enhetsregisteret/enhet/${orgNumber}.json`

  return axios({url})
    .then(res => res.data)
    .then(company => {
      debug('got company:', company)
      response.json({
        orgNumber: company.organisasjonsnummer,
        name: company.navn,
        address: {
          address: company.forretningsadresse.adresse,
          postNumber: company.forretningsadresse.postnummer,
          city: company.forretningsadresse.poststed
        }
      })
    })
    .catch(() => {
      response.json({msg: 'Company was not found.'}, 400)
    })
}
