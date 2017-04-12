// Search
export const searchText = (searchText) => {
  console.log(searchText)
  return {
    type: 'SEARCH',
    searchText
  }
}
