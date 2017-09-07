const flattenArray = (ary) => {
  return ary.reduce(function(a, b) {
    if (Array.isArray(b)) {
      return a.concat(flattenArray(b))
    }
    return a.concat(b)
  }, [])
}

export default flattenArray
