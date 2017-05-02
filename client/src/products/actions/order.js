
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
        console.log(json)
      })
      .catch(err => console.log(err))
  }
}



const fetchOrderSuccess = (order) => ({ type: 'ADD_ORDER', order })
const fetchOrderFailure = (error) => ({ type: 'ERROR', error })
export const fetchOrder = (values) => {
  return (dispatch, getState) => {
    Stripe.setPublishableKey('pk_test_TAIO4tEnJzNuQkmjuWwcznSK')
    const cart = getState().cart
    const { number, exp, cvc, firstName, lastName, address, zip, state } = values
    const expiration = exp.split('/')
    const exp_month = parseInt(expiration[0], 10)
    const exp_year = parseInt(expiration[1], 10)
    const card = { number, exp_month, exp_year, cvc }
    return getStripeToken(card)
      .then(token => {
        fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.getItem('token')
          },
          body: JSON.stringify({ token, cart, firstName, lastName, address, zip, state })
        })
          .then(res => res.json())
          .then(json => {
            if (json.error) return Promise.reject()
            dispatch(fetchOrderSuccess(json))
            dispatch(fetchDeleteCart())
          })
          .catch(err => dispatch(fetchOrderFailure(err)))
      })
  }
}










export const fetchOrders = (orders) => ({ type: 'FETCH_ORDERS', orders })
export const startFetchOrders = () => {
  return (dispatch, getState) => {
    return fetch('/api/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      }
    })
      .then(res => res.json())
      .then(json => dispatch(fetchOrders(json)))
      .catch(err => console.log(err))
  }
}
