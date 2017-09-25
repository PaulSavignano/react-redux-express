const slugIt = (value) => {
  return value.replace(/[^-a-zA-Z0-9\s+]+/ig, '').replace(/\s+/gi, "-").toLowerCase()
}

export default slugIt
