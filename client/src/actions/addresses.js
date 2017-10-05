import { SubmissionError } from 'redux-form'

import handleAuthFetch from '../utils/handleAuthFetch'
import * as userActions from './user'
import * as usersActions from './users'

export const type = 'ADDRESS'
const route = 'addresses'

const ERROR = `ERROR_${type}`

const fetchFailure = (error) => ({ type: ERROR, error })


// Create
export const fetchAdd = (add) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}`,
      method: 'POST',
      body: add
    })
    .then(json => {
      const { user } = json
      return dispatch(userActions.fetchUpdateSuccess(user))
    })
    .catch(error => {
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}

export const fetchAdminAdd = (userId, add) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/admin/${userId}`,
      method: 'POST',
      body: add
    })
    .then(json => {
      return dispatch(usersActions.fetchUpdateSuccess(json))
    })
    .catch(error => {
      console.log(error)
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}

// Update
export const fetchUpdate = (_id, update) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/${_id}`,
      method: 'PATCH',
      body: update
    })
    .then(json => {
      return dispatch(userActions.fetchUpdateSuccess(json))
    })
    .catch(error => {
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}

export const fetchAdminUpdate = (_id, update) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/admin/${_id}`,
      method: 'PATCH',
      body: update
    })
    .then(json => {
      return dispatch(usersActions.fetchUpdateSuccess(json))
    })
    .catch(error => {
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}



// Delete
export const fetchDelete = (_id) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/${_id}`,
      method: 'DELETE',
      body: null
    })
    .then(json => {
      const { user } = json
      return dispatch(userActions.fetchUpdateSuccess(user))
    })
    .catch(error => {
      console.log(error)
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Delete failed!' })
    })
  }
}


export const fetchAdminDelete = (userId, _id) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/admin/${userId}/${_id}`,
      method: 'DELETE',
      body: null
    })
    .then(json => {
      return dispatch(usersActions.fetchUpdateSuccess(json))
    })
    .catch(error => {
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Delete failed!' })
    })
  }
}
