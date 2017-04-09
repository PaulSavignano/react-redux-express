export const searchCart = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_CARTS':
      return action.searchCartsText
    default:
      return state
  }
}


export const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.cart
    case 'FETCH_CART':
      return action.cart
    case 'UPDATE_ITEM':
      return state.map(item =>
        item.productId === action.item.productId ? { ...item, ...action.item } : item
      )
    case 'DELETE_ITEM':
      return state.filter(item =>
        item.productId !== action.item.productId
      )
    default:
      return state
  }
}

export const total = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state + (action.item.price * action.item.productQty)
    case 'ADD_QTY':
      return state + action.item.price
    case 'MINUS_QTY':
      return state - action.item.price
    case 'DELETE_ITEM':
      return 0
    default:
      return state
  }
}

export const qty = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state + action.item.productQty
    case 'ADD_QTY':
      return state + 1
    case 'MINUS_QTY':
      return state - 1
    case 'DELETE_ITEM':
      return 0
    default:
      return state
  }
}
