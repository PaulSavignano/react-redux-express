export const search = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.searchText
    default:
      return state
  }
}
