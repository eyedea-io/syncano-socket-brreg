import axios from 'axios'
import Syncano from '@syncano/core'

export default async (ctx) => {
  const {response, logger} = new Syncano(ctx)
  const {debug} = logger('get')
  const {orgNumber} = ctx.args
  const url = `http://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`

  try {
    const resp = await axios({url})
    const company = resp.data
    debug('got company:', company)
    response.json({
      orgNumber: parseInt(company.organisasjonsnummer, 10),
      name: company.navn,
      address: {
        address: company.forretningsadresse.adresse.join(' '),
        postNumber: company.forretningsadresse.postnummer,
        city: company.forretningsadresse.poststed
      }
    })
  } catch (err) {
    response.json({msg: 'Company was not found.'}, 400)
  }
}
