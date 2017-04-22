// Search
export const searchCarts = (searchCartsText) => {
  return {
    type: 'SEARCH_CARTS',
    searchCartsText
  }
}













// Create
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
        body: JSON.stringify(product)
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


// Read
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


// Update
export const updateCart = (cart) => {
  return {
    type: 'UPDATE_CART',
    cart
  }
}
export const startUpdateCart = (product) => {
  return (dispatch, getState) => {
    const cartId = localStorage.getItem('cart')
    if (cartId) {
      return fetch(`/api/carts/${cartId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify(product)
      })
        .then(res => res.json())
        .then(json => dispatch(updateCart(json)))
        .catch(err => console.log(err))
    }
  }
}


// Delete
export const deleteCart = (cartId) => {
  return {
    type: 'DELETE_CART',
    cartId
  }
}
export const startDeleteCart = () => {
  const cartId = localStorage.getItem('cart')
  return (dispatch, getState) => {
    return fetch(`/api/carts/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => dispatch(deleteCart(json._id)))
      .catch(err => console.log(err))
  }
}
