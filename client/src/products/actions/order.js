
/* global Stripe */
import { getStripeToken } from '../../stripe/getStripeToken'


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
        localStorage.removeItem('cart')
      })
      .catch(err => console.log(err))
  }
}


const fetchAddOrderSuccess = (order) => ({ type: 'ADD_ORDER', order })
const fetchAddOrderFailure = (error) => ({ type: 'ERROR_ORDER', error })
export const fetchAddOrder = (values) => {
  return (dispatch, getState) => {
    Stripe.setPublishableKey('pk_test_TAIO4tEnJzNuQkmjuWwcznSK')
    const cart = getState().cart
    const { number, exp, cvc, firstname, lastname, address, zip, state } = values
    const expiration = exp.split('/')
    const exp_month = parseInt(expiration[0], 10)
    const exp_year = parseInt(expiration[1], 10)
    const card = { number, exp_month, exp_year, cvc }
    return getStripeToken(card)
      .then(token => {
        fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.getItem('token')
          },
          body: JSON.stringify({ token, cart, firstname, lastname, address, zip, state })
        })
          .then(res => res.json())
          .then(json => {
            if (json.error) return Promise.reject()
            dispatch(fetchAddOrderSuccess(json))
            dispatch(fetchDeleteCart())
          })
          .catch(err => dispatch(fetchAddOrderFailure(err)))
      })
  }
}









const fetchOrdersRequest = () => ({ type: 'REQUEST_ORDERS' })
const fetchOrdersSuccess = (orders) => ({ type: 'RECEIVE_ORDERS', orders })
const fetchOrdersFailure = (error) => ({ type: 'ERROR_ORDER', error })
export const fetchOrders = () => {
  return (dispatch, getState) => {
    dispatch(fetchOrdersRequest())
    return fetch('/api/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchOrdersSuccess(json))
      })
      .catch(err => dispatch(fetchOrdersFailure(err)))
  }
}
