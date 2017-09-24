import { SubmissionError } from 'redux-form'

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
    return fetch(`/api/${route}/admin`, {
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
    return fetch(`/api/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
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
    return fetch(`/api/${route}/admin/${_id}`, {
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
    return fetch(`/api/${route}/admin/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchDeleteSuccess(json._id))
      })
      .catch(error => {
        dispatch(fetchFailure(error))
        throw new SubmissionError({ ...error, _error: 'Delete failed!' })
      })
  }
}
