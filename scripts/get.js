import axios from 'axios'
import Syncano from 'syncano-server'


export default function run(ctx) {
  const {response, logger} = Syncano(ctx)
  const {debug} = logger('get')
  const {orgNumber} = ctx.args
  const url = `http://data.brreg.no/enhetsregisteret/enhet/${orgNumber}.json`

  return axios({url})
    .then(res => res.data)
    .then(company => {
      response.json({
        orgNumber: company.organisasjonsnummer,
        name: company.navn,
        address: {
          address: company.forretningsadresse.adresse,
          postNumber: company.forretningsadresse.postnummer,
          city: company.forretningsadresse.poststed,
        }
      })
    })
    .catch(err => {
      response.json({msg: 'Company was not found.'}, 400)
    })
}
