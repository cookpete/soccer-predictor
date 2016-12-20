const MATCH_NEWLINE = /\s*[\r\n]+\s*/g
const DEFAULT_DELIMITER = /\s*,\s*/

export function parseCSV (string, delimiter = DEFAULT_DELIMITER) {
  const lines = string.split(MATCH_NEWLINE)
  const headers = lines[0].split(delimiter)

  return lines.slice(1).filter(filterLine).map(line => {
    return buildObject(headers, line.split(delimiter))
  })
}

function filterLine (line) {
  return /[^ ,]/.test(line) // Returns false when line is just whitespace or commas
}

// Use arrays of headers and data to create an object where
// each header applies to data at the same index
function buildObject (headers, line) {
  return headers.reduce(function (object, header, index) {
    object[header] = parseValue(line[index])
    return object
  }, {})
}

function parseValue (value) {
  return !isNaN(value) ? +value : value // Convert to number if numeric
}
