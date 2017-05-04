import { SubmissionError } from 'redux-form'

const ADD = 'ADD_THEME'
const REQUEST = 'REQUEST_THEME'
const RECEIVE = 'RECEIVE_THEME'
const UPDATE = 'UPDATE_THEME'
const DELETE = 'DELETE_THEME'
const ERROR = 'ERROR_THEME'

// Create
const fetchAddThemeSuccess = (item) => ({ type: ADD, item })
const fetchAddThemeFailure = (error) => ({ type: ERROR, error })
export const fetchAddTheme = () => {
  return (dispatch, getState) => {
    console.log('adding')
    return fetch('/api/themes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchAddThemeSuccess(json))
      })
      .catch(err => {
        dispatch(fetchAddThemeFailure(err))
        throw new SubmissionError({ error: err.error, _error: err.error })
    })
  }
}



// Read
const fetchThemeRequest = () => ({ type: REQUEST })
const fetchThemeSuccess = (item) => ({ type: RECEIVE, item })
const fetchThemeFailure = (error) => ({ type: ERROR, error })
export const fetchTheme = () => {
  return (dispatch, getState) => {
    dispatch(fetchThemeRequest())
    return fetch(`/api/themes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        if (json.length) return dispatch(fetchThemeSuccess(json[0]))
        dispatch(fetchAddTheme())
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchThemeFailure(err))
      })


  }
}



// Update
const fetchUpdateThemeSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateThemeFailure = (error) => ({ type: ERROR, error })
export const fetchUpdateTheme = (_id, update) => {
  return (dispatch, getState) => {
    return fetch(`/api/themes/${_id}`, {
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
        dispatch(fetchUpdateThemeSuccess(json))
      })
      .catch(err => dispatch(fetchUpdateThemeFailure(err)))
  }
}



// Delete
const fetchDeleteThemeSuccess = (_id) => ({ type: DELETE, _id })
const fetchDeleteThemeFailure = (error) => ({ type: ERROR, error })
export const fetchDeleteTheme = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/themes/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchDeleteThemeSuccess(json._id))
      })
      .catch(err => dispatch(fetchDeleteThemeFailure(err)))
  }
}
