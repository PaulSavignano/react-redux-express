import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import { fetchOrders } from './orders'

export const type = 'USER'
const route = 'users'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}`
const RECEIVE = `RECEIVE_${type}`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const ERROR = `ERROR_${type}`


// Create
const fetchAddSuccess = (item) => ({ type: ADD, item })
const fetchAddFailure = (error) => ({ type: ERROR, error })
export const fetchAdd = (add) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(add)
    })
      .then(res => {
        if (res.ok) {
          localStorage.setItem('token', res.headers.get('x-auth'))
        }
        return res.json()
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchAddSuccess(json))
        const path = getState().user.redirect || null
        if (path) return dispatch(push(path))
      })
      .catch(err => {
        dispatch(fetchAddFailure(err))
        throw new SubmissionError({ ...err, _error: 'Signup failed' })
    })
  }
}


// Read
const fetchUserRequest = () => ({ type: REQUEST })
const fetchUserSuccess = (item) => ({ type: RECEIVE, item })
const fetchUserFailure = (error) => ({ type: ERROR, error })
export const fetchUser = (token) => {
  return (dispatch) => {
    dispatch(fetchUserRequest())
    return fetch(`/api/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchUserSuccess(json))
      })
      .catch(err => {
        const token = localStorage.getItem('token')
        if (token) localStorage.removeItem('token')
        dispatch(fetchUserFailure(err))
      })
    }
}


// Update
const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateFailure = (error) => ({ type: ERROR, error })
export const fetchUpdate = (update) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}`, {
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
      .catch(err => {
        console.error(err)
        dispatch(fetchUpdateFailure(err))
        throw new SubmissionError({ ...err, _error: err })
      })
  }
}



// Delete
const fetchDeleteSuccess = () => ({ type: DELETE })
const fetchDeleteFailure = (error) => ({ type: ERROR, error })
export const fetchDelete = () => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        localStorage.removeItem('token')
        dispatch(fetchDeleteSuccess())
      })
      .catch(err => dispatch(fetchDeleteFailure(err)))
  }
}











export const redirectUser = (path) => {
  return {
    type: 'REDIRECT_USER',
    path
  }
}


const fetchSigninSuccess = (item) => ({ type: 'RECEIVE_USER', item })
const fetchSigninFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchSignin = (values) => {
  return (dispatch, getState) => {
    return fetch('/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.ok) localStorage.setItem('token', res.headers.get('x-auth'))
        return res.json()
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchSigninSuccess(json))
        dispatch(fetchOrders())
        const path = getState().user.redirect || null
        if (path) return dispatch(push(path))
      })
      .catch(err => {
        dispatch(fetchSigninFailure(err))
        throw new SubmissionError({ ...err, _error: 'Sigin failed!'})
      })
  }
}


const fetchSignoutSuccess = () => ({ type: 'DELETE_USER' })
const fetchSignoutFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchSignout = () => {
  return (dispatch, getState) => {
    return fetch('/api/users/signout', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('token')
          dispatch(fetchSignoutSuccess())
        }
        throw new Error('Network response was not ok.')
      })
      .catch(err => dispatch(fetchSignoutFailure(err)))
  }
}


const fetchRecoverySuccess = (message) => ({ type: 'RECOVER_USER', message })
const fetchRecoveryFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchRecovery = ({ email }) => {
  return function(dispatch, getState) {
    return fetch('/api/users/recovery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(res => {
        if (res.ok) localStorage.setItem('token', res.headers.get('x-auth'))
        return res.json()
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchRecoverySuccess(json))
      })
      .catch(err => {
        dispatch(fetchRecoveryFailure(err))
        throw new SubmissionError({ ...err, _error: 'Recovery failed!' })
      })
  }
}


const fetchResetSuccess = (user) => ({ type: 'RESET_USER', user })
const fetchResetFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchReset = ({ password }, token) => {
  return (dispatch, getState) => {
    return fetch(`/api/users/reset/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
      .then(res => {
        if (res.ok) localStorage.setItem('token', res.headers.get('x-auth'))
        return res.json()
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchResetSuccess(json))
      })
      .catch(err => {
        dispatch(fetchResetFailure({ error: 'invalid token' }))
        throw new SubmissionError({ ...err, _error: 'Reset failed!' })
      })
  }
}


const fetchContactSuccess = (values) => ({ type: 'CONTACT_USER', values })
const fetchContactFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchContact = (values) => {
  return function(dispatch, getState) {
    return fetch('/api/users/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchContactSuccess(json))
      })
      .catch(err => dispatch(fetchContactFailure(err)))
  }
}
















const fetchRequestEstimateSuccess = (values) => ({ type: 'CONTACT_USER', values })
const fetchRequestEstimateFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchRequestEstimate = (values) => {
  return function(dispatch, getState) {
    return fetch('/api/users/request-estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchRequestEstimateSuccess(json))
      })
      .catch(err => dispatch(fetchRequestEstimateFailure(err)))
  }
}
