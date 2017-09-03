import { SubmissionError } from 'redux-form'

import * as userActions from './user'
import * as usersActions from './users'

export const type = 'ADDRESS'
const route = 'addresses'

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
        return dispatch(userActions.fetchUpdateSuccess(json))
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchAddFailure(error))
        throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}

export const fetchAdminAdd = (userId, add) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/admin/${userId}`, {
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
        return dispatch(usersActions.fetchUpdateSuccess(json))
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchAddFailure(error))
        throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}

// Read
// const fetchAddressesRequest = () => ({ type: REQUEST })
// export const fetchAddressesSuccess = (items) => ({ type: RECEIVE, items })
// const fetchAddressesFailure = (error) => ({ type: ERROR, error })
// export const fetchAddresses = () => {
//   return (dispatch, getState) => {
//     dispatch(fetchAddressesRequest())
//     return fetch(`/api/${route}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-auth': localStorage.getItem('token'),
//       }
//     })
//       .then(res => res.json())
//       .then(json => {
//         if (json.error) return Promise.reject(json.error)
//         dispatch(fetchAddressesSuccess(json))
//       })
//       .catch(error => {
//         console.log(error)
//         dispatch(fetchAddressesFailure(error))
//       })
//   }
// }

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
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        return dispatch(userActions.fetchUpdateSuccess(json))
      })
      .catch(error => {
        dispatch({ type: ERROR, error })
        throw new SubmissionError({ ...error, _error: 'Update failed!' })
      })
  }
}

export const fetchAdminUpdate = (_id, update) => {
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
        return dispatch(usersActions.fetchUpdateSuccess(json))
      })
      .catch(error => {
        dispatch({ type: ERROR, error })
        throw new SubmissionError({ ...error, _error: 'Update failed!' })
      })
  }
}



// Delete
const fetchDeleteSuccess = (_id) => ({ type: DELETE, _id })
const fetchDeleteFailure = (error) => ({ type: ERROR, error })
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
        return dispatch(userActions.fetchUpdateSuccess(json))
      })
      .catch(error => {
        dispatch({ type: ERROR, error })
        throw new SubmissionError({ ...error, _error: 'Delete failed!' })
      })
  }
}


export const fetchAdminDelete = (userId, _id) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/admin/${userId}/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        return dispatch(usersActions.fetchUpdateSuccess(json))
      })
      .catch(error => {
        dispatch({ type: ERROR, error })
        throw new SubmissionError({ ...error, _error: 'Delete failed!' })
      })
  }
}
