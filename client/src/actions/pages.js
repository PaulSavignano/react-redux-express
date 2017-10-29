import { SubmissionError } from 'redux-form'

import handleAuthFetch from '../utils/handleAuthFetch'
import { fetchProducts } from './products'
import { stopEdit } from './editItem'

export const type = 'PAGE'
const route = 'pages'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}S`
const RECEIVE = `RECEIVE_${type}S`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const ERROR = `ERROR_${type}`

// Create
const fetchAddSuccess = (item) => ({ type: ADD, item })
const fetchAddFailure = (error) => ({ type: ERROR, error })
export const fetchAdd = (add) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}`,
      method: 'POST',
      body: add
    })
    .then(json => dispatch(fetchAddSuccess(json)))
    .catch(error => {
      dispatch(fetchAddFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}



// Read
const fetchPagesRequest = () => ({ type: REQUEST })
const fetchPagesSuccess = (items) => ({ type: RECEIVE, items })
const fetchPagesFailure = (error) => ({ type: ERROR, error })
export const fetchPages = () => {
  return (dispatch, getState) => {
    dispatch(fetchPagesRequest())
    return fetch(`/api/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchPagesSuccess(json))
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchPagesFailure(error))
      })
  }
}



// Update
export const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateFailure = (error) => ({ type: ERROR, error })
export const fetchUpdate = ({ path, update }) => {
  return (dispatch, getState) => {
    console.log(path, update)
    return handleAuthFetch({
      path: `/api/${route}/${path}`,
      method: 'PATCH',
      body: update
    })
    .then(json => {
      console.log(json)
      dispatch(fetchUpdateSuccess(json))
      dispatch(stopEdit())
    })
    .catch(error => {
      dispatch(fetchUpdateFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}



// Delete
const fetchDeleteSuccess = (_id) => ({ type: DELETE, _id })
const fetchDeleteFailure = (error) => ({ type: ERROR, error })
export const fetchDelete = (_id) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/${_id}`,
      method: 'DELETE',
      body: null
    })
    .then(json => {
      dispatch(fetchProducts())
      dispatch(fetchDeleteSuccess(json._id))
    })
    .catch(error => {
      dispatch(fetchDeleteFailure(error))
      throw new SubmissionError({ ...error, _error: 'Delete failed!' })
    })
  }
}
