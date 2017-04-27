# Soccer Predictor

[![Latest npm version](https://img.shields.io/npm/v/soccer-predictor.svg)](https://www.npmjs.com/package/soccer-predictor)
[![Build Status](https://img.shields.io/travis/CookPete/soccer-predictor/master.svg)](https://travis-ci.org/CookPete/soccer-predictor)
[![Dependency Status](https://img.shields.io/david/CookPete/soccer-predictor.svg)](https://david-dm.org/CookPete/soccer-predictor)
[![devDependency Status](https://img.shields.io/david/dev/CookPete/soccer-predictor.svg)](https://david-dm.org/CookPete/soccer-predictor?type=dev)

A JS library that predicts soccer match outcomes using basic mathematics.

## Installation

Use [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com) to install.

```shell
yarn add soccer-predictor           # yarn
npm install soccer-predictor --save # npm
```

### Install locally

```shell
git clone https://github.com/CookPete/soccer-predictor.git
cd soccer-predictor
yarn # or npm install
npm run build
```

### Testing locally

```shell
npm test # Run tests
```

## Usage

```js
import { analyseResults, calculateProbabilities } from 'soccer-predictor'

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

```

For more examples, see [`examples`](./examples).

## FAQ

### How does it work?

There are plenty of articles available that go into depth about basic poisson prediction. Essentially the library parses a series of match results and provides functions to return a rough percentage likelyhood of various outcomes of a match between two teams.

Further reading:

* https://plus.maths.org/content/understanding-uncertainty-football-crazy
* http://opisthokonta.net/?p=296
* https://www.sbo.net/strategy/football-prediction-model-poisson-distribution/

### Isn’t it called football?

Yes, but `football-predictor` seems too ambigious. Everyone knows what [soccer](https://en.wikipedia.org/wiki/Soccer) is.
