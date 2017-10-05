import { SubmissionError } from 'redux-form'

import handleAuthFetch from '../utils/handleAuthFetch'

export const type = 'USERS'
const route = 'users'

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
    return handleAuthFetch({
      path: `/api/${route}/admin`,
      method: 'POST',
      body: add
    })
    .then(json => {
      dispatch(fetchAddSuccess(json))
    })
    .catch(error => {
      console.log(error)
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}

// Read
const fetchUsersRequest = () => ({ type: REQUEST })
export const fetchUsersSuccess = (items) => ({ type: RECEIVE, items })
const fetchUsersFailure = (error) => ({ type: ERROR, error })
export const fetchUsers = () => {
  return (dispatch, getState) => {
    dispatch(fetchUsersRequest())
    return handleAuthFetch({
      path: `/api/${route}`,
      method: 'GET',
      body: null
    })
    .then(json => {
      dispatch(fetchUsersSuccess(json))
    })
    .catch(error => {
      console.log(error)
      dispatch(fetchUsersFailure(error))
    })
  }
}

// Update
export const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
export const fetchUpdate = (_id, update) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/admin/${_id}`,
      method: 'PATCH',
      body: update
    })
    .then(json => {
      dispatch(fetchUpdateSuccess(json))
    })
    .catch(error => {
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}



// Delete
export const fetchDeleteSuccess = (_id) => ({ type: DELETE, _id })
export const fetchDelete = (_id) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/admin/${_id}`,
      method: 'DELETE',
      body: null
    })
    .then(json => {
      dispatch(fetchDeleteSuccess(json._id))
    })
    .catch(error => {
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Delete failed!' })
    })
  }
}
