import axios from 'axios'
import {response} from 'syncano-server'


const {orgNumber} = ARGS
const url = `http://data.brreg.no/enhetsregisteret/enhet/${orgNumber}.json`

axios({
  baseURL: url,
  method: 'get',
})
  .then(res => res.data)
  .then(({data: [company]}) => {
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
  .catch(err => response.json({message: 'Company was not found.'}, 400))
