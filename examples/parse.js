import { readFile } from 'fs'
import { join } from 'path'

import { parseCSV, analyseResults, calculateProbabilities } from '../src/index'

const file = join(__dirname, 'data', '2015-prem.csv')

readFile(file, 'utf8', (err, data) => {
  if (err) throw err

  // Use parseCSV to get an array of results from the CSV file
  const results = parseCSV(data)
  console.log(`${results.length} results from parsing CSV file`)

  // Use analyseResults to return an array of teams with stats
  const teams = analyseResults(results, getMatchDetails)
  console.log(`${teams.length} teams from analysing results`)

  // Now lets calculate probabilities of the first and
  // second teams in the array as an example
  const homeTeam = teams[0]
  const awayTeam = teams[1]
  const probs = calculateProbabilities(homeTeam, awayTeam)

  console.log(`Prediction for ${homeTeam.name} vs ${awayTeam.name}:`)
  console.log(`${percent(probs.result.home)} home win`)
  console.log(`${percent(probs.result.draw)} draw`)
  console.log(`${percent(probs.result.away)} away win`)
})

// Function to return teams and scores based on the
// CSV file headings, to be used by analyseResults
function getMatchDetails (data) {
  return {
    homeTeamName: data.HomeTeam,
    awayTeamName: data.AwayTeam,
    homeGoals: data.FTHG,
    awayGoals: data.FTAG
  }
}

function percent (percent) {
  return (percent * 100).toFixed(1) + '%'
}
