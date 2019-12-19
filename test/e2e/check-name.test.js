/* global describe it expect */
import {run} from '@syncano/test'

describe('check-name', () => {
  let existingCompany = {
    name: 'EYEDEA AS'
  }

  let nonExistingCompany = {
    name: 'Eyeeeedea AS'
  }

  it('check name of existing company', async () => {
    const result = await run('check-name', {args: {...existingCompany}})
    expect(result).toHaveProperty('code', 200)
    expect(result.data).toHaveProperty('exist', true)
  })

  it('check name of non-existing company (but starts with the same chars)', async () => {
    const result = await run('check-name', {args: {...nonExistingCompany}})
    expect(result).toHaveProperty('code', 200)
    expect(result.data).toHaveProperty('exist', false)
  })
})
