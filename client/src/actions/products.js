import { SubmissionError } from 'redux-form'

import * as pageActions from './pages'
import { startEdit, stopEdit } from './editItem'

export const type = 'PRODUCT'
const route = 'products'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}S`
const RECEIVE = `RECEIVE_${type}S`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const ERROR = `ERROR_${type}`


const fetchFailure = (error) => ({ type: ERROR, error })

// Create
const fetchAddSuccess = (item) => ({ type: ADD, item })
export const fetchAdd = (add) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(add)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        const { editItem, page, product } = json
        dispatch(pageActions.fetchUpdateSuccess(page))
        dispatch(fetchAddSuccess(product))
        return dispatch(startEdit({ item: editItem, kind: 'PRODUCT' }))
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchFailure(error))
        throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}

// Read
const fetchProductsRequest = () => ({ type: REQUEST })
const fetchProductsSuccess = (items) => ({ type: RECEIVE, items })
export const fetchProducts = () => {
  return (dispatch, getState) => {
    dispatch(fetchProductsRequest())
    return fetch(`/api/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchProductsSuccess(json))
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchFailure(error))
      })
  }
}

// Update
const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
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
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        const { page, product } = json
        dispatch(pageActions.fetchUpdateSuccess(page))
        dispatch(fetchUpdateSuccess(product))
        return dispatch(stopEdit())
      })
      .catch(error => {
        dispatch(fetchFailure(error))
        throw new SubmissionError({ ...error, _error: 'Update failed!' })
      })
  }
}



// Delete
const fetchDeleteSuccess = (_id) => ({ type: DELETE, _id })
export const fetchDelete = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        const { page, product } = json
        dispatch(pageActions.fetchUpdateSuccess(page))
        dispatch(fetchDeleteSuccess(product._id))
        dispatch(stopEdit())
      })
      .catch(error => {
        dispatch(fetchFailure(error))
        throw new SubmissionError({ ...error, _error: 'Delete failed!' })
      })
  }
}
