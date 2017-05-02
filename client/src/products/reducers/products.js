export const searchProducts = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_PRODUCTS':
      return action.searchProductsText
    default:
      return state
  }
}

export const products = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST':
      return {
        ...state,
        isFetching: true
      }
    case 'ADD_PRODUCT':
      return {
        ...state,
        isFetching: false,
        items: [
          ...state.items,
          action.product
        ]
      }
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        isFetching: false,
        items: action.products
      }
    case 'UPDATE_PRODUCT':
    return {
      ...state,
      items: state.items.map(product => product._id === action.product._id ?
        { ...product, ...action.product } :
        product
      )
    }
    case 'DELETE_PRODUCT':
      return {
        ...state,
        items: state.items.filter(product => product._id !== action._id)
      }
    case 'ERROR':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
