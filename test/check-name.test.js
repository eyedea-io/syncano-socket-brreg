/* global describe it */
import {assert} from 'chai'
import {run} from 'syncano-test'

describe('check-name', function () {
  let existingCompany = {
    orgNumber: 915642349,
    name: 'Eyedea AS'
  }

  let nonExistingCompany = {
    orgNumber: 12312312311,
    name: 'Eyeeeedea AS'
  }

  it('check name of existing company', function (done) {
    run('check-name', {args: existingCompany})
      .then(response => {
        assert.propertyVal(response.data, 'exist', true)
        assert.propertyVal(response, 'code', 200)
        done()
      })
  })

  it('check name of non-existing company (but starts with the same chars)', function (done) {
    run('check-name', {args: nonExistingCompany})
      .then(response => {
        assert.propertyVal(response.data, 'exist', false)
        assert.propertyVal(response, 'code', 200)
        done()
      })
  })
})
