import { describe, it } from 'mocha'
import { expect } from 'chai'

import { add } from '../src/index'

describe('add', () => {
  it('returns correct value', () => {
    expect(add(1, 2)).to.equal(3)
  })
})
