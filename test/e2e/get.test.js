/* global describe it expect */
import {run, generateMeta} from '@syncano/test'

describe('get', function () {
  const meta = generateMeta()
  let existingCompany = {
    orgNumber: 915642349
  }

  let nonExistingCompany = {
    orgNumber: 12312312311
  }

  it('by org number', async () => {
    const result = await run('get', {args: existingCompany, meta})
    expect(result.data).toHaveProperty('orgNumber', existingCompany.orgNumber)
    expect(result.data).toHaveProperty('name')
    expect(result.data).toHaveProperty('address')
  })

  it('by org number (non-existing company)', async () => {
    const result = await run('get', {args: nonExistingCompany, meta})
    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('msg', 'Company was not found.')
  })
})
