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
    case 'ADD_ITEM':
      const itemExists = state.map(x => x.productId).indexOf(action.item.productId)
      const update = state.map(item =>
        item.productId === action.item.productId ?
          { ...item, productQty: item.productQty + action.item.productQty } :
          item
        )
      if (itemExists !== -1) {
        return [
          ...update
        ]
      }
      return [
        ...state,
        action.item
      ]
    case 'DELETE_ITEM':
      console.log(action.item)
      return state.filter(item =>
        item.productId !== action.item.productId
      )
    case 'UPDATE_ITEM':
    return state.map(item =>
      item.productId === action.productId ?
        { ...item, ...action.updates } :
        item
      )
    default:
      return state
  }
}

export const total = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state + (action.item.price * action.item.productQty)
    case 'DELETE_ITEM':
      return state - (action.item.price * action.item.productQty)
    default:
      return state
  }
}

export const qty = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state + action.item.productQty
    case 'DELETE_ITEM':
      return state - action.item.productQty
    default:
      return state
  }
}
