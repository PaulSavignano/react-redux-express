export const searchCartProducts = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_CART_PRODUCTS':
      return action.searchCartProductsText
    default:
      return state
  }
}


export const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CART_PRODUCT':
      return [
        ...state,
        action.product
      ]
    case 'FETCH_CART_PRODUCTS':
    const updatedArray = [ ...state, ...action.products ]
    const filteredArray = updatedArray.filter((object, index, self) => {
      return self.findIndex(obj => obj._id === object._id) === index
    })
      return filteredArray
    case 'UPDATE_CART_PRODUCT':
    return state.map(product =>
      product._id === action._id ?
        { ...product, ...action.updates } :
        product
      )
    case 'DELETE_CART_PRODUCT':
      return state.filter(product =>
        product._id !== action._id
      )
    default:
      return state
  }
}
