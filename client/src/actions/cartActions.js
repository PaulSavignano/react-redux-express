export const setCartSearch = (searchText) => {
  return {
    type: 'SET_CART_SEARCH',
    searchText
  }
}

export const cartAdd = (cart) => {
  return {
    type: 'CART_ADD',
    cart
  }
}
