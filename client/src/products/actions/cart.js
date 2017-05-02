// Search
export const searchCarts = (searchCartsText) => {
  return {
    type: 'SEARCH_CARTS',
    searchCartsText
  }
}




// Create
const fetchAddToCartSuccess = (cart) => ({ type: 'ADD_TO_CART', cart })
const fetchAddToCartFailure = (error) => ({ type: 'ERROR', error })
export const fetchAddToCart = (product) => {
  return (dispatch, getState) => {
    const cartId = localStorage.getItem('cart')
    if (cartId !== null) {
      return fetch(`/api/carts/${cartId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify(product)
      })
        .then(res => res.json())
        .then(json => {
          if (json.error) return Promise.reject()
          dispatch(fetchAddToCartSuccess(json))
        })
        .catch(err => dispatch(fetchAddToCartFailure(err)))
    } else {
      return fetch('/api/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      })
        .then(res => {
          if (res.json().error) return Promise.reject()
          localStorage.setItem('cart', res.headers.get('cart'))
          dispatch(fetchAddToCartSuccess(res.json()))
        })
        .catch(err => dispatch(fetchAddToCartFailure(err)))
    }

  }
}


// Read
const fetchCartRequest = () => ({ type: 'REQUEST' })
const fetchCartSuccess = (cart) => ({ type: 'FETCH_CART', cart })
const fetchCartFailure = (error) => ({ type: 'ERROR', error })
export const fetchCart = () => {
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
      .then(json => {
        if (json.error) return Promise.reject()
        dispatch(fetchCartSuccess(json))
      })
      .catch(err => dispatch(fetchCartFailure(err)))
    }
    console.log('no cart')
  }
}


// Update
const fetchUpdateCartSuccess = (cart) => ({ type: 'UPDATE_CART', cart })
const fetchUpdateCartFailure = (error) => ({ type: 'ERROR', error })
export const fetchUpdateCart = (product) => {
  return (dispatch, getState) => {
    const cartId = localStorage.getItem('cart')
    return fetch(`/api/carts/${cartId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject()
        dispatch(fetchUpdateCartSuccess(json))
      })
      .catch(err => dispatch(fetchUpdateCartFailure(err)))
  }
}


// Delete
const fetchDeleteCartSuccess = (cartId) => ({ type: 'DELETE_CART', cartId })
const fetchDeleteCartFailure = (error) => ({ type: 'ERROR', error })
export const fetchDeleteCart = () => {
  const cartId = localStorage.getItem('cart')
  return (dispatch, getState) => {
    return fetch(`/api/carts/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject()
        dispatch(fetchDeleteCartSuccess(json._id))
      })
      .catch(err => fetchDeleteCartFailure(err))
  }
}
