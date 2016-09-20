import { describe, it } from 'mocha'
import { expect } from 'chai'

import results from './data/results.json'
import teams from './data/teams.json'
import { analyseResults } from '../src/teams'

// results.json is already in correct match details format
const getMatchDetails = match => match

describe('analyseResults', () => {
  it('returns an array of teams with stats', () => {
    expect(analyseResults(results, getMatchDetails)).to.deep.equal(teams)
  })
})
