import { SubmissionError } from 'redux-form'

import handleAuthFetch from '../utils/handleAuthFetch'
import { fetchOrdersSuccess } from './orders'
import { fetchUsersSuccess, fetchDeleteSuccess as usersDeleteSuccess } from './users'

export const type = 'USER'
const route = 'users'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}`
const RECEIVE = `RECEIVE_${type}`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const ERROR = `ERROR_${type}`

const fetchFailure = (error) => {
  return {
    type: ERROR,
    error
  }
}

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
          localStorage.setItem('x-access-token', res.headers.get('x-access-token'))
          localStorage.setItem('x-refresh-token', res.headers.get('x-refresh-token'))
        }
        return res.json()
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        const { user } = json
        return dispatch(fetchAddSuccess(user))
      })
      .catch(error => {
        dispatch(fetchFailure(error))
        throw new SubmissionError({ ...error, _error: Object.values(error)[0] })
    })
  }
}



// Read
const fetchUserRequest = () => ({ type: REQUEST })
const fetchUserSuccess = (item) => ({ type: RECEIVE, item })
export const fetchUser = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest())
    return handleAuthFetch({
      path: `/api/${route}`,
      method: 'GET',
      body: null
    })
    .then(json => {
      const { user, users, orders } = json
      if (users) dispatch(fetchUsersSuccess(users))
      if (orders) dispatch(fetchOrdersSuccess(orders))
      return dispatch(fetchUserSuccess(user))
    })
    .catch(error => {
      console.log(error)
      localStorage.removeItem('x-access-token')
      localStorage.removeItem('x-refresh-token')
      dispatch({ type: 'DELETE_USER' })
      dispatch({ type: 'DELETE_ALL_USERS' })
      dispatch({ type: 'DELETE_ORDERS' })
      dispatch(fetchFailure(error))
    })
    }
}


// Update
export const fetchUpdateSuccess = (item) => {
  return { type: UPDATE, item }
}

export const fetchUpdate = (update) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}`,
      method: 'PATCH',
      body: update
    })
    .then(json => {
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
    return handleAuthFetch({
      path: `/api/${route}`,
      method: 'DELETE',
      body: null
    })
    .then(json => {
      localStorage.removeItem('x-access-token')
      localStorage.removeItem('x-refresh-token')
      dispatch(fetchDeleteSuccess())
      dispatch(usersDeleteSuccess(json))
    })
    .catch(error => {
      console.log(error)
      dispatch(fetchFailure(error))
    })
  }
}











export const redirectUser = (path) => {
  return {
    type: 'REDIRECT_USER',
    path
  }
}


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
        if (res.ok) {
          localStorage.setItem('x-access-token', res.headers.get('x-access-token'))
          localStorage.setItem('x-refresh-token', res.headers.get('x-refresh-token'))
        }
        return res.json()
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        const { user, users, orders } = json
        if (users) dispatch(fetchUsersSuccess(users))
        if (orders) dispatch(fetchOrdersSuccess(orders))
        dispatch(fetchUserSuccess(user))
        const path = getState().user.redirect
        if (path) {
          history.push(path)
          return dispatch({ type: 'REDIRECT_USER', path: '/' })
        }
        return history.push('/')
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchFailure(error))
        throw new SubmissionError({ ...error, _error: Object.values(error)[0] })
      })
  }
}




export const signout = (history) => {
  return function(dispatch, getState) {
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-refresh-token')
    dispatch({ type: 'DELETE_USER' })
    dispatch({ type: 'DELETE_ORDERS' })
    dispatch({ type: 'DELETE_ALL_USERS' })
    return history.push('/user/signin')
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
        throw new SubmissionError({ ...error, _error: Object.values(error)[0] })
      })
  }
}


export const fetchReset = ({ password }, resetToken) => {
  return (dispatch, getState) => {
    return fetch(`/api/users/reset/${resetToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
      .then(res => {
        if (res.ok) {
          localStorage.setItem('x-access-token', res.headers.get('x-access-token'))
          localStorage.setItem('x-refresh-token', res.headers.get('x-refresh-token'))
        }
        return res.json()
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        const { user, users, orders } = json
        if (users) dispatch(fetchUsersSuccess(users))
        if (orders) dispatch(fetchOrdersSuccess(orders))
        return dispatch(fetchUserSuccess(user))
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchFailure({ error: 'invalid reset token' }))
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
