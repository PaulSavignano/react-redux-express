export const type = 'CART'
const route = 'carts'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}`
const RECEIVE = `RECEIVE_${type}`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const ERROR = `ERROR_${type}`

// Create
const fetchAddToCartSuccess = (cart) => ({ type: ADD, cart })
const fetchAddToCartFailure = (error) => ({ type: ERROR, error })
export const fetchAddToCart = (update) => {
  return (dispatch, getState) => {
    const cartId = localStorage.getItem('cart')
    if (cartId !== null) {
      return fetch(`/api/${route}/${cartId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify(update)
      })
        .then(res => {
          if (res.ok) return res.json()
          throw new Error('Network response was not ok.')
        })
        .then(json => {
          if (json.error) return Promise.reject(json.error)
          dispatch(fetchAddToCartSuccess(json))
        })
        .catch(err => dispatch(fetchAddToCartFailure(err)))
    } else {
      return fetch(`/api/${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
      })
        .then(res => {
          if (res.ok) {
            localStorage.setItem('cart', res.headers.get('cart'))
          }
          return res.json()
        })
        .then(json => {
          if (json.error) return Promise.reject(json.error)
          dispatch(fetchAddToCartSuccess(json))
        })
        .catch(err => dispatch(fetchAddToCartFailure(err)))
    }
  }
}


// Read
const fetchCartRequest = () => ({ type: REQUEST })
const fetchCartSuccess = (cart) => ({ type: RECEIVE, cart })
const fetchCartFailure = (error) => ({ type: ERROR, error })
export const fetchCart = (cartId) => {
  return (dispatch, getState) => {
    dispatch(fetchCartRequest())
    return fetch(`/api/${route}/${cartId}`, {
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
    .catch(err => {
      localStorage.removeItem('cart')
      dispatch(fetchCartFailure(err))
    })
  }
}


// Update
const fetchUpdateCartSuccess = (cart) => ({ type: UPDATE, cart })
const fetchUpdateCartFailure = (error) => ({ type: ERROR, error })
export const fetchUpdateCart = (update) => {
  return (dispatch, getState) => {
    const cartId = localStorage.getItem('cart')
    return fetch(`/api/${route}/${cartId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchUpdateCartSuccess(json))
        if (json.quantity === 0) dispatch(fetchDeleteCart(json._id))
      })
      .catch(err => dispatch(fetchUpdateCartFailure(err)))
  }
}



// Delete
const fetchDeleteCartSuccess = () => ({ type: DELETE })
const fetchDeleteCartFailure = (error) => ({ type: ERROR, error })
export const fetchDeleteCart = () => {
  const cartId = localStorage.getItem('cart')
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        localStorage.removeItem('cart')
        dispatch(fetchDeleteCartSuccess())
      })
      .catch(err => fetchDeleteCartFailure(err))
  }
}
