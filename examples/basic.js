import { analyseResults, calculateProbabilities } from '../src'

// Some basic example data
const results = [
  { homeTeam: 'Team A', awayTeam: 'Team B', homeGoals: 1, awayGoals: 0 },
  { homeTeam: 'Team B', awayTeam: 'Team C', homeGoals: 2, awayGoals: 1 },
  { homeTeam: 'Team C', awayTeam: 'Team A', homeGoals: 1, awayGoals: 3 }
]

// Function to map match data to soccer-predictor data
function getMatchDetails (match) {
  return {
    homeTeamName: match.homeTeam,
    awayTeamName: match.awayTeam,
    homeGoals: match.homeGoals,
    awayGoals: match.awayGoals
  }
}

// Parse results into an array of teams with calculated stats
const teams = analyseResults(results, getMatchDetails)

// Use calculateProbabilities to calculate the chance of
// various outcomes of a match between two teams
const probabilities = calculateProbabilities(teams[0], teams[1])

console.log(probabilities.result) // Probability of a home win, away win or draw
// {
//   home: 0.657541673613264,
//   draw: 0.252533180170396,
//   away: 0.089924594462736
// }

console.log(probabilities.scores[1][0]) // Probability of a 1-0 result
// 0.2300324502673927

console.log(probabilities.over['2.5']) // Probability of over 2.5 goals
// 0.2895346409101279

console.log(probabilities.btts.yes) // Probability of both teams to score
// 0.2429353553660894
