export function iterate (source, fn) {
  return map(source, value => {
    if (typeof value === 'object' && value instanceof Array === false) {
      return iterate(value, fn)
    }
    return fn(value)
  })
}

export function map (obj, fn) {
  return Object.keys(obj).reduce((output, key) => {
    output[key] = fn(obj[key])
    return output
  }, {})
}
