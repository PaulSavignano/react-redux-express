export const filterList = (list, searchText) => {
  const filteredList = list.filter(item => {
    const name = item.name.toLowerCase()
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filteredList
}
