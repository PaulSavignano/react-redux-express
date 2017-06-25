
const search = (state = null, action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.searchText
    default:
      return state
  }
}

export default search
