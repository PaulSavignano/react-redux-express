/* global Stripe */
import { getStripeToken } from '../utils/getStripeToken'
import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

import { fetchDeleteCart } from './cart'

export const type = 'ORDER'
const route = 'orders'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}S`
const RECEIVE = `RECEIVE_${type}S`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}S`
const ERROR = `ERROR_${type}`


const fetchAddOrderSuccess = (item) => ({ type: ADD, item })
const fetchAddOrderFailure = (error) => ({ type: ERROR, error })
export const fetchAddOrder = (order) => {
  return (dispatch, getState) => {
    Stripe.setPublishableKey('pk_test_TAIO4tEnJzNuQkmjuWwcznSK')
    const { number, exp, cvc } = order
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
          body: JSON.stringify({ token, ...order })
        })
          .then(res => {
            if (res.ok) return res.json()
            throw new Error('Network response was not ok.')
          })
          .then(json => {
            if (json.error) return Promise.reject(json.error)
            dispatch(fetchAddOrderSuccess(json))
            dispatch(fetchDeleteCart())
            return dispatch(push(`/user/order/${json._id}`))
          })
          .catch(err => {
            console.error(err)
            dispatch(fetchAddOrderFailure(err))
            throw new SubmissionError({ ...err, _error: err })
          })
      })
  }
}









const fetchOrdersRequest = () => ({ type: REQUEST })
const fetchOrdersSuccess = (items) => ({ type: RECEIVE, items })
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
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchOrdersSuccess(json))
      })
      .catch(err => dispatch(fetchOrdersFailure(err)))
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
      .catch(err => {
        dispatch(fetchUpdateFailure(err))
        throw new SubmissionError({ ...err, _error: 'Update failed!' })
      })
  }
}


export const deleteOrders = (items) => {
  return {
    type: DELETE,
  }
}
