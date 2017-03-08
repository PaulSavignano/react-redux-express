export const searchProducts = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_PRODUCTS':
      return action.searchProductsText
    default:
      return state
  }
}

export const products = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [
        ...state,
        action.product
      ]
    case 'FETCH_PRODUCTS':
      return [
        ...action.products
      ]
    case 'UPDATE_PRODUCT':
    return state.map(product =>
      product._id === action._id ?
        { ...product, ...action.updates } :
        product
      )
    case 'DELETE_PRODUCT':
      return state.filter(product =>
        product._id !== action._id
      )
    default:
      return state
  }
}
