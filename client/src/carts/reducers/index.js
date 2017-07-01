const cart = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_CART':
      return {
        ...state,
        isFetching: true
      }
    case 'ADD_CART':
      return {
        ...state,
        ...action.cart
      }
    case 'RECEIVE_CART':
      return {
        ...state,
        ...action.cart,
        isFetching: false
      }
    case 'UPDATE_CART':
      return {
        ...state,
        ...action.cart
      }
    case 'DELETE_CART':
      return {
        isFetching: false
      }
    case 'ERROR_CART':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default cart
