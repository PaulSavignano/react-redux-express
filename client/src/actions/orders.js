/* global Stripe */
import { getStripeToken } from '../utils/getStripeToken'
import { SubmissionError } from 'redux-form'

import { fetchDeleteCart } from './cart'

export const type = 'ORDER'
const route = 'orders'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}S`
const RECEIVE = `RECEIVE_${type}S`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}S`
const ERROR = `ERROR_${type}`



const handleErrorField = (fieldError, buttonError) => {
  throw new SubmissionError({ ...fieldError, _error: buttonError })
}



const fetchAddOrderSuccess = (item) => ({ type: ADD, item })
const fetchAddOrderFailure = (error) => ({ type: ERROR, error })
export const fetchAddOrder = ({
  cart,
  history,
  values: {
    cvc,
    exp,
    fullAddress,
    number,
    name,
    phone,
    street,
    city,
    state,
    zip,
  }
}) => {
  return (dispatch, getState) => {
    Stripe.setPublishableKey('pk_test_TAIO4tEnJzNuQkmjuWwcznSK')
    const expiration = exp.split('/')
    const exp_month = parseInt(expiration[0], 10)
    const exp_year = parseInt(expiration[1], 10)
    const card = { number, exp_month, exp_year, cvc }
    return getStripeToken(card)
    .then(token => {
      return fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': localStorage.getItem('token')
        },
        body: JSON.stringify({
          token,
          fullAddress,
          name,
          phone,
          street,
          city,
          state,
          zip,
          cart
        })
      })
      .then(response => {
        return response.json()
        .then(json => {
          if (response.ok) {
            return json
          } else {
            return Promise.reject(json.error)
          }
        })
      })
      .then(json => {
        dispatch(fetchAddOrderSuccess(json))
        dispatch(fetchDeleteCart())
        return history.push(`/user/order/${json._id}`)
      })
      .catch(error => Promise.reject(error))
    })
    .catch(error => {
      let fieldError, buttonError
      if (typeof error === 'string') {
        if (error.indexOf('expiration') >= 0) {
          fieldError = { exp: error }
          buttonError = error
        } else if (error.indexOf('security') >= 0) {
          fieldError = { cvc: error }
          buttonError = error
        } else if (error.indexOf('number') >= 0) {
          fieldError = { number: error }
          buttonError = error
        } else {
          fieldError: null,
          buttonError = 'Checkout failed'
        }
      } else if (typeof error === 'object') {
        if (error.message) {
          fieldError = { number: error.message }
          buttonError = 'Charge failed'
        }
      }
      dispatch(fetchAddOrderFailure(error))
      return handleErrorField(fieldError, buttonError)
    })
  }
}









const fetchOrdersRequest = () => ({ type: REQUEST })
export const fetchOrdersSuccess = (items) => ({ type: RECEIVE, items })
const fetchOrdersFailure = (error) => ({ type: ERROR, error })
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
      .catch(error => dispatch(fetchOrdersFailure(error)))
  }
}



// Update
const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateFailure = (error) => ({ type: ERROR, error })
export const fetchUpdate = (_id, update) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(update)
    })
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchUpdateSuccess(json))
      })
      .catch(error => {
        dispatch(fetchUpdateFailure(error))
        throw new SubmissionError({ ...error, _error: 'Update failed!' })
      })
  }
}


export const deleteOrders = (items) => {
  return {
    type: DELETE,
  }
}
