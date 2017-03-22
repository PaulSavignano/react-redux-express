export const searchCart = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_CARTS':
      return action.searchCartsText
    default:
      return state
  }
}


export const items = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const itemExists = state.map(x => x.productId).indexOf(action.item.productId)
      const update = state.map(item =>
      item.productId === action.item.productId ?
        { ...item, productQty: item.productQty + action.item.productQty } :
        item
      )
      const total = state.map(item => (item.productQty * item.price))
      if (itemExists !== -1) {
        return [
          ...update
        ]
      }
      return [
        ...state,
        action.item
      ]
    case 'UPDATE_CART':
    return state.map(item =>
      item.productId === action.productId ?
        { ...item, ...action.updates } :
        item
      )
    case 'DELETE_CART':
      return state.filter(item =>
        item._id !== action._id
      )
    default:
      return state
  }
}

export const total = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
        const itemTotal = action.item.price * action.item.productQty
        const total = state + itemTotal
        return total
      return state
    default:
      return state
  }
}




// state.map(item =>
// product.productId === action.product.productId ?
//   { ...product, productQty: product.productQty + action.product.productQty } :
//   product
// )
