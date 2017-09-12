const normalizeState = value => {
  if (!value) {
    return value
  }
  const toUpperCase = value.toUpperCase()
  if (toUpperCase.length <= 2) {
    return toUpperCase
  }
}

export default normalizeState
