import { average } from './utils/math'
import { iterate } from './utils/object'

const MIN_SCORE = 0.1

// Takes an array of results and a function to return match details
// and returns an array of teams with calculated performance stats
export function analyseResults (results, getMatchDetails) {
  if (!results || results instanceof Array === false) {
    throw new Error('First parameter must be an array of results')
  }

  if (typeof getMatchDetails !== 'function') {
    throw new Error('Second parameter must be a function')
  }

  let teams = results.reduce(function (teams, match) {
    return matchReducer(teams, getMatchDetails(match))
  }, {})

  const averages = getAverages(results, getMatchDetails, teams)

  return Object.keys(teams).map(name => {
    return {
      ...teams[name],
      name,
      stats: getTeamStats(teams[name], averages)
    }
  })
}

function matchReducer (teams, { homeTeamName, awayTeamName, homeGoals, awayGoals }) {
  const homeTeam = teams[homeTeamName] || newTeam()
  const awayTeam = teams[awayTeamName] || newTeam()

  homeTeam.played++
  homeTeam.home.played++
  homeTeam.goals.for += homeGoals
  homeTeam.goals.against += awayGoals
  homeTeam.home.goals.for += homeGoals
  homeTeam.home.goals.against += awayGoals

  awayTeam.played++
  awayTeam.away.played++
  awayTeam.goals.for += awayGoals
  awayTeam.goals.against += homeGoals
  awayTeam.away.goals.for += awayGoals
  awayTeam.away.goals.against += homeGoals

  if (homeGoals > awayGoals) {
    homeTeam.wins++
    homeTeam.home.wins++
    homeTeam.form.push('W')
    homeTeam.home.form.push('W')
    awayTeam.losses++
    awayTeam.away.losses++
    awayTeam.form.push('L')
    awayTeam.away.form.push('L')
  }

  if (homeGoals === awayGoals) {
    homeTeam.draws++
    homeTeam.home.draws++
    homeTeam.form.push('D')
    homeTeam.home.form.push('D')
    awayTeam.draws++
    awayTeam.away.draws++
    awayTeam.form.push('D')
    awayTeam.away.form.push('D')
  }

  if (homeGoals < awayGoals) {
    homeTeam.losses++
    homeTeam.home.losses++
    homeTeam.form.push('L')
    homeTeam.home.form.push('L')
    awayTeam.wins++
    awayTeam.away.wins++
    awayTeam.form.push('W')
    awayTeam.away.form.push('W')
  }

  return {
    ...teams,
    [homeTeamName]: homeTeam,
    [awayTeamName]: awayTeam
  }
}

function newTeam () {
  return {
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goals: { for: 0, against: 0 },
    form: [],
    home: { played: 0, wins: 0, draws: 0, losses: 0, goals: { for: 0, against: 0 }, form: [] },
    away: { played: 0, wins: 0, draws: 0, losses: 0, goals: { for: 0, against: 0 }, form: [] }
  }
}

function getAverages (results, getMatchDetails, teams) {
  // Arrays of goal counts to be averaged out
  let averages = {
    for: [],
    against: [],
    home: { for: [], against: [] },
    away: { for: [], against: [] },
    expectedGoals: { home: [], away: [] } // Same for all teams
  }

  averages = results.reduce((averages, match) => {
    const { homeGoals, awayGoals } = getMatchDetails(match)
    averages.expectedGoals.home.push(homeGoals)
    averages.expectedGoals.away.push(awayGoals)
    return averages
  }, averages)

  averages = Object.keys(teams).reduce((averages, key) => {
    const team = teams[key]
    averages.for.push(team.goals.for)
    averages.against.push(team.goals.against)
    averages.home.for.push(team.home.goals.for)
    averages.home.against.push(team.home.goals.against)
    averages.away.for.push(team.away.goals.for)
    averages.away.against.push(team.away.goals.against)
    return averages
  }, averages)

  return iterate(averages, average)
}

function getTeamStats (team, averages) {
  return {
    as: getScore(team.goals.for / averages.for),
    dw: getScore(team.goals.against / averages.against),
    home: {
      as: getScore(team.home.goals.for / averages.home.for),
      dw: getScore(team.home.goals.against / averages.home.against)
    },
    away: {
      as: getScore(team.away.goals.for / averages.away.for),
      dw: getScore(team.away.goals.against / averages.away.against)
    },
    expectedGoals: averages.expectedGoals // Same for all teams
  }
}

function getScore (score) {
  return Math.max(score, MIN_SCORE)
}
