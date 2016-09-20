import { describe, it } from 'mocha'
import { expect } from 'chai'

import { average, poisson } from '../src/utils/math'

// http://faculty.wwu.edu/auer/DSCI205/bbs-e12-POIS.pdf
const POISSON_TABLE = [
  [0.9048, 0.8187, 0.7408, 0.6703, 0.6065, 0.5488, 0.4966, 0.4493, 0.4066, 0.3679],
  [0.0905, 0.1637, 0.2222, 0.2681, 0.3033, 0.3293, 0.3476, 0.3595, 0.3659, 0.3679],
  [0.0045, 0.0164, 0.0333, 0.0536, 0.0758, 0.0988, 0.1217, 0.1438, 0.1647, 0.1839],
  [0.0002, 0.0011, 0.0033, 0.0072, 0.0126, 0.0198, 0.0284, 0.0383, 0.0494, 0.0613],
  [0.0000, 0.0001, 0.0003, 0.0007, 0.0016, 0.0030, 0.0050, 0.0077, 0.0111, 0.0153],
  [0.0000, 0.0000, 0.0000, 0.0001, 0.0002, 0.0004, 0.0007, 0.0012, 0.0020, 0.0031]
]

describe('average', () => {
  it('returns the average of an array', () => {
    expect(average([1, 2, 3])).to.equal(2)
  })
})

describe('poisson', () => {
  it('returns correct values', () => {
    for (let x = 0; x !== 6; x++) {
      for (let y = 0; y !== 10; y++) {
        const l = (y + 1) / 10
        expect(parseFloat(poisson(x, l).toFixed(4))).to.equal(POISSON_TABLE[x][y])
      }
    }
  })
})
