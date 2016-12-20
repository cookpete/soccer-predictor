import { describe, it } from 'mocha'
import { expect } from 'chai'

import { parseCSV } from '../src/utils/parse'

describe('parseCSV', () => {
  const expected = [
    { Name: 'John', Age: 40, Gender: 'Male' },
    { Name: 'Barry', Age: 35, Gender: 'Male' },
    { Name: 'Mary', Age: 32, Gender: 'Female' }
  ]

  it('parses a CSV string', () => {
    const input = `Name,Age,Gender\nJohn,40,Male\nBarry,35,Male\nMary,32,Female`
    expect(parseCSV(input)).to.deep.equal(expected)
  })

  it('skips blank lines', () => {
    const input = `Name,Age,Gender\n\n\n\nJohn,40,Male\n\nBarry,35,Male\n\nMary,32,Female\n\n`
    expect(parseCSV(input)).to.deep.equal(expected)
  })

  it('skips comma lines', () => {
    const input = `Name,Age,Gender\n\n\n\nJohn,40,Male\n\nBarry,35,Male\n\nMary,32,Female\n\n,,\n\n`
    expect(parseCSV(input)).to.deep.equal(expected)
  })

  it('takes a delimiter parameter', () => {
    const input = `Name\tAge\tGender\nJohn\t40\tMale\nBarry\t35\tMale\nMary\t32\tFemale`
    expect(parseCSV(input, '\t')).to.deep.equal(expected)
  })
})
