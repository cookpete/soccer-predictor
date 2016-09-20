export function poisson (target, mean) {
  return Math.pow(mean, target) * Math.pow(Math.E, -mean) / factorial(target)
}

// Average the numbers in an array
export function average (array) {
  return total(array) / array.length
}

function factorial (num) {
  let result = 1
  for (let i = 2; i <= num; i++) {
    result *= i
  }
  return result
}

// Total the numbers in an array
function total (array) {
  return array.reduce((total, number) => number + total, 0)
}
