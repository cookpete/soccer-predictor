import { describe, it } from 'mocha'
import { expect } from 'chai'

import { map, iterate } from '../src/utils/object'

const increment = a => a + 1

describe('map', () => {
  it('maps through an object', () => {
    const input = { a: 1, b: 2 }
    const expected = { a: 2, b: 3 }
    expect(map(input, increment)).to.deep.equal(expected)
  })

  it('maps through objects', () => {
    const fn = a => a.b
    const input = {
      a: {
        b: 1,
        c: 2
      },
      d: {
        b: 3,
        c: 4
      }
    }
    const expected = {
      a: 1,
      d: 3
    }
    expect(map(input, fn)).to.deep.equal(expected)
  })
})
describe('iterate', () => {
  it('iterates through an object', () => {
    const input = { a: 1, b: 2 }
    const expected = { a: 2, b: 3 }
    expect(iterate(input, increment)).to.deep.equal(expected)
  })

  it('iterates through a deep object', () => {
    const input = {
      a: 1,
      b: {
        c: 3,
        d: 4
      }
    }
    const expected = {
      a: 2,
      b: {
        c: 4,
        d: 5
      }
    }
    expect(iterate(input, increment)).to.deep.equal(expected)
  })
})
