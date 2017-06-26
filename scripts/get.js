import axios from 'axios'
import {response, logger} from 'syncano-server'


const {debug} = logger('check-name')
const {orgNumber} = ARGS
const url = `http://data.brreg.no/enhetsregisteret/enhet/${orgNumber}.json`

axios({url})
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
    response.json({message: 'Company was not found.'}, 400)
  })
