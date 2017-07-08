const normalizeZip = value => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 5) {
    return onlyNums
  }
}

export default normalizeZip
