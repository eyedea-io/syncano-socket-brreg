import _ from 'lodash'
import crypto from 'crypto'
import {assert} from 'chai'
import {run} from 'syncano-test'


describe('get', function() {

  let existingCompany = {
    orgNumber: 915642349,
    name: 'Eyedea AS'
  }

  let nonExistingCompany = {
    orgNumber: 12312312311,
    name: 'Eyeeeedea AS'
  }


  it('by org number', function(done) {
    run('get', {args: {orgNumber: existingCompany.orgNumber}})
      .then(response => {
        assert.propertyVal(response.data, 'orgNumber', existingCompany.orgNumber)
        assert.property(response.data, 'name')
        assert.property(response.data, 'address')
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })

  it('by org number (non-existing company)', function(done) {
    run('get', {args: {orgNumber: nonExistingCompany.orgNumber}})
      .then(response => {
        assert.propertyVal(response, 'code', 400)
        assert.propertyVal(response.data, 'msg', 'Company was not found.')
        done()
      })
  })

})
