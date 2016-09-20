import { poisson } from './utils/math'

const MAX_GOALS = 10 // Number of goals to scorecast

// Takes two teams from the result of analyseResults
// and calculates probability of different match outcomes
// using a basic poisson formula
// https://plus.maths.org/content/understanding-uncertainty-football-crazy
export function calculateProbabilities (homeTeam, awayTeam) {
  // Expected number of goals for teams when home and away
  let homeExpectedGoals = homeTeam.stats.expectedGoals.home
  let awayExpectedGoals = awayTeam.stats.expectedGoals.away

  // Calculate performance multipliers based on team scores
  const homeMultiplier = homeTeam.stats.as * awayTeam.stats.dw
  const awayMultiplier = awayTeam.stats.as * homeTeam.stats.dw

  // Apply multipliers
  homeExpectedGoals *= homeMultiplier
  awayExpectedGoals *= awayMultiplier

  // Predict an outcome based on expected goals scored
  return scorecast(homeExpectedGoals, awayExpectedGoals)
}

function scorecast (homeExpectedGoals, awayExpectedGoals) {
  const result = { home: 0, away: 0 }
  const scores = []
  const under = {
    '0.5': 0,
    '1.5': 0,
    '2.5': 0,
    '3.5': 0,
    '4.5': 0
  }
  const over = {
    '0.5': 0,
    '1.5': 0,
    '2.5': 0,
    '3.5': 0,
    '4.5': 0
  }
  const btts = { yes: 0, no: 0 }

  for (let h = 0; h <= MAX_GOALS; h++) {
    scores[h] = []
    for (let a = 0; a <= MAX_GOALS; a++) {
      const probability = poisson(h, homeExpectedGoals) * poisson(a, awayExpectedGoals)

      // Home/away win
      if (h > a) result.home += probability
      if (h < a) result.away += probability

      // Scores
      scores[h][a] = probability

      // BTTS
      if (h === 0 || a === 0) {
        btts.no += probability
      } else {
        btts.yes += probability
      }

      // Under/over
      for (let i = 0.5; i < 5; i++) {
        if (h + a < i) under[i] += probability
        if (h + a > i) over[i] += probability
      }
    }
  }

  result.draw = 1 - result.home - result.away

  return {
    result,
    scores,
    under,
    over,
    btts
  }
}
