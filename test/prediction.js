import { describe, it } from 'mocha'
import { expect } from 'chai'

import teams from './data/teams.json'
import probabilities from './data/probabilities.json'
import { calculateProbabilities } from '../src/prediction'

describe('calculateProbabilities', () => {
  it('calculates probabilities', () => {
    expect(calculateProbabilities(teams[0], teams[1])).to.deep.equal(probabilities)
  })
})
