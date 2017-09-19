import { reset, SubmissionError } from 'redux-form'

import { fetchOrders } from './orders'
import { fetchUsersSuccess } from './users'

export const type = 'USER'
const route = 'users'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}`
const RECEIVE = `RECEIVE_${type}`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const ERROR = `ERROR_${type}`

const fetchFailure = (error) => ({ type: ERROR, error })
// Create
const fetchAddSuccess = (item) => ({ type: ADD, item })
export const fetchAdd = (values) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.ok) {
          localStorage.setItem('token', res.headers.get('x-auth'))
        }
        return res.json()
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        return dispatch(fetchAddSuccess(json))
      })
      .catch(error => {
        dispatch(fetchFailure(error))
        throw new SubmissionError({ ...error, _error: 'Signup failed' })
    })
  }
}



// Read
const fetchUserRequest = () => ({ type: REQUEST })
const fetchUserSuccess = (item) => ({ type: RECEIVE, item })
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
        const { user, users } = json
        if (users) dispatch(fetchUsersSuccess(users))
        dispatch(fetchOrders())
        return dispatch(fetchUserSuccess(user))
      })
      .catch(error => {
        console.log(error)
        const token = localStorage.getItem('token')
        if (token) localStorage.removeItem('token')
        dispatch(fetchFailure(error))
      })
    }
}


// Update
export const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
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
      .catch(error => {
        console.error(error)
        dispatch(fetchFailure(error))
        throw new SubmissionError({ ...error, _error: error })
      })
  }
}



// Delete
const fetchDeleteSuccess = () => ({ type: DELETE })
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
      .catch(error => dispatch(fetchFailure(error)))
  }
}











export const redirectUser = (path) => {
  return {
    type: 'REDIRECT_USER',
    path
  }
}


const fetchSigninSuccess = (item) => ({ type: RECEIVE, item })
export const fetchSignin = ({ history, values }) => {
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
        const { user, users } = json
        if (users) dispatch(fetchUsersSuccess(users))
        dispatch(fetchOrders())
        dispatch(fetchSigninSuccess(user))
        return history.goBack()
      })
      .catch(error => {
        dispatch(fetchFailure(error))
        throw new SubmissionError({ ...error, _error: 'Sigin failed'})
      })
  }
}


const fetchSignoutSuccess = () => ({ type: 'DELETE_USER' })
export const fetchSignout = (history) => {
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
          dispatch({ type: 'DELETE_ORDERS'})
          history.push('/user/signin')
        }
        throw new Error('Network response was not ok.')
      })
      .catch(error => dispatch(fetchFailure(error)))
  }
}


const fetchRecoverySuccess = (message) => ({ type: 'RECOVER_USER', message })
export const fetchRecovery = ({ email }) => {
  return function(dispatch, getState) {
    return fetch('/api/users/recovery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchRecoverySuccess(json))
      })
      .catch(error => {
        dispatch(fetchFailure(error))
        throw new SubmissionError({ ...error, _error: 'Recovery failed' })
      })
  }
}


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
        const { user, users } = json
        if (users) dispatch(fetchUsersSuccess(users))
        dispatch(fetchOrders())
        return dispatch(fetchUserSuccess(user))
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchFailure({ error: 'invalid token' }))
        throw new SubmissionError({ ...error, _error: 'Reset failed' })
      })
  }
}


const fetchContactSuccess = (values) => ({ type: 'CONTACT_USER', values })
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
      .catch(error => dispatch(fetchFailure(error)))
  }
}




const fetchRequestEstimateSuccess = (values) => ({ type: 'CONTACT_USER', values })
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
      .catch(error => dispatch(fetchFailure(error)))
  }
}
