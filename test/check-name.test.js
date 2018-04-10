/* global describe it */
import {assert} from 'chai'
import {run, generateMeta} from '@syncano/test'

describe('check-name', function () {
  const meta = generateMeta()
  let existingCompany = {
    name: 'Eyedea AS'
  }

  let nonExistingCompany = {
    name: 'Eyeeeedea AS'
  }

  it('check name of existing company', function (done) {
    run('check-name', {args: existingCompany, meta})
      .then(response => {
        assert.propertyVal(response.data, 'exist', true)
        assert.propertyVal(response, 'code', 200)
        done()
      })
  })

  it('check name of non-existing company (but starts with the same chars)', function (done) {
    run('check-name', {args: nonExistingCompany, meta})
      .then(response => {
        assert.propertyVal(response.data, 'exist', false)
        assert.propertyVal(response, 'code', 200)
        done()
      })
  })
})
