// Create Cart
export const addItem = (item) => {
  console.log(item)
  return (dispatch, getState) => {
    if (getState().cart.items.find(i => i.productId === item.productId)) {
      return dispatch({ type: 'UPDATE_ITEM', item })
    }

    dispatch({ type: 'ADD_ITEM', item })
  }
}

export const deleteItem = (item) => {
  return {
    type: 'DELETE_ITEM',
      item
  }
}

export const addQty = (item) => {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_ITEM', item })
    dispatch({ type: 'ADD_QTY', item })
  }
}

export const minusQty = (item) => {
  return (dispatch, getState) => {
    console.log(item.productQty)
    if (item.productQty < 1) {
      return dispatch({ type: 'DELETE_ITEM', item })
    }
    dispatch({ type: 'UPDATE_ITEM', item })
    dispatch({ type: 'MINUS_QTY', item })
  }
}

// Search
export const searchCarts = (searchCartsText) => {
  return {
    type: 'SEARCH_CARTS',
    searchCartsText
  }
}














export const addToCart = (cart) => {
  return {
    type: 'ADD_TO_CART',
    cart
  }
}
export const startAddToCart = (product) => {
  return (dispatch, getState) => {
    const cartId = localStorage.getItem('cart')
    if (cartId) {
      return fetch(`/api/carts/${cartId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify({ type: 'ADD_QTY', product })
      })
        .then(res => res.json())
        .then(json => dispatch(addToCart(json)))
        .catch(err => console.log(err))
    }
    return fetch('/api/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product)
    })
      .then(res => {
        localStorage.setItem('cart', res.headers.get('cart'))
        return res.json()
      })
      .then(json => dispatch(addToCart(json)))
      .catch(err => console.log(err))
  }
}









export const fetchCart = (cart) => {
  return {
    type: 'FETCH_CART',
    cart
  }
}
export const startFetchCart = () => {
  return (dispatch, getState) => {
    const cartId = localStorage.getItem('cart')
    if (cartId) {
      return fetch(`/api/carts/${cartId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(json => dispatch(fetchCart(json)))
      .catch(err => console.log(err))
    }
    console.log('no cart')
  }
}
