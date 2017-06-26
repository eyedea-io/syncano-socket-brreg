import Syncano from 'syncano-client'

import crypto from 'crypto'
import _ from 'lodash'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'


chai.use(chaiAsPromised);
const assert = chai.assert
const s = new Syncano(process.env.SYNCANO_PROJECT_INSTANCE)

describe('searching for the company', function() {

  let existingCompany = {
    orgNumber: 915642349,
    name: 'Eyedea AS'
  }

  let nonExistingCompany = {
    orgNumber: 12312312311,
    name: 'Eyeeeedea AS'
  }

  it('check name of existing company', function(done) {
    s.post('brreg/check-name', {name: existingCompany.name}, {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        assert.propertyVal(response, 'exist', true)
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })

  it('check name of non-existing company (but starts with the same chars)', function(done) {
    s.post('brreg/check-name', {name: existingCompany.name.substring(0,5)}, {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        assert.propertyVal(response, 'exist', false)
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })

  it('check name of non-existing company', function(done) {
    s.post('brreg/check-name', {name: nonExistingCompany.name}, {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        assert.propertyVal(response, 'exist', false)
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })

  it('get by org number (existing company)', function(done) {
    s.post('brreg/get', {orgNumber: existingCompany.orgNumber}, {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        assert.propertyVal(response, 'orgNumber', existingCompany.orgNumber)
        assert.property(response, 'name')
        assert.property(response, 'address')
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })

  it('get by org number (non-existing company)', function(done) {
    s.post('brreg/get', {orgNumber: nonExistingCompany.orgNumber}, {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        console.log(response)
        done('Something went wrong!')
      })
      .catch(err => {
        assert.property(err, 'response')
        assert.propertyVal(err.response.data, 'message', 'Company was not found.')
        done()
      })
  })

})
