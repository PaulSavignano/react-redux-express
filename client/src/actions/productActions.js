export const setProductSearch = (searchText) => {
  return {
    type: 'SET_PRODUCT_SEARCH',
    searchText
  }
}

export const productAdd = (product) => {
  return {
    type: 'PRODUCT_ADD',
    product
  }
}
