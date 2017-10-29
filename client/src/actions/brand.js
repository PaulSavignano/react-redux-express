import { SubmissionError } from 'redux-form'

import handleAuthFetch from '../utils/handleAuthFetch'

export const type = 'BRAND'
const route = 'brands'

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
const fetchBrandRequest = () => ({ type: REQUEST })
const fetchBrandSuccess = (items) => ({ type: RECEIVE, items })
const fetchBrandFailure = (error) => ({ type: ERROR, error })
export const fetchBrand = () => {
  return (dispatch, getState) => {
    dispatch(fetchBrandRequest())
    return fetch(`/api/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.error) return Promise.reject(json.error)
      dispatch(fetchBrandSuccess(json[0]))
    })
    .catch(error => {
      console.log(error)
      dispatch(fetchBrandFailure(error))
    })
  }
}



// Update
const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateFailure = (error) => ({ type: ERROR, error })
export const fetchUpdate = ({ path, update }) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/${path}`,
      method: 'PATCH',
      body: update
    })
    .then(json => dispatch(fetchUpdateSuccess(json)))
    .catch(error => {
      console.log(error)
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
    .then(json => dispatch(fetchDeleteSuccess(json._id)))
    .catch(error => {
      dispatch(fetchDeleteFailure(error))
      throw new SubmissionError({ ...error, _error: 'Delete failed!' })
    })
  }
}
