import { SubmissionError } from 'redux-form'

import * as pageActions from './pages'

export const type = 'SLIDES'
const route = 'slides'

const START_EDIT = `START_EDIT_${type}`
const STOP_EDIT = `STOP_EDIT_${type}`
const TOGGLE = `TOGGLE_${type}`
const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}S`
const RECEIVE = `RECEIVE_${type}S`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const DELETES = `DELETE_${type}S`
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
        const { slide, page } = json
        dispatch(fetchAddSuccess(slide))
        dispatch(pageActions.fetchUpdateSuccess(page))
      })
      .catch(err => {
        dispatch(fetchAddFailure(err))
        throw new SubmissionError({ error: err.error, _error: err.error })
    })
  }
}



// Read
const fetchSlidesRequest = () => ({ type: REQUEST })
const fetchSlidesSuccess = (items) => ({ type: RECEIVE, items })
const fetchSlidesFailure = (error) => ({ type: ERROR, error })
export const fetchSlides = () => {
  return (dispatch, getState) => {
    dispatch(fetchSlidesRequest())
    return fetch(`/api/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (res.ok) return res.json()
      throw new Error('Network response was not ok.')
    })
    .then(json => {
      if (json.error) return Promise.reject(json.error)
      dispatch(fetchSlidesSuccess(json))
    })
    .catch(err => {
      console.log(err)
      dispatch(fetchSlidesFailure(err))
      throw new SubmissionError({ ...err, _error: 'Update failed!' })
    })
  }
}



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
        dispatch(fetchUpdateSuccess(json))
      })
      .catch(err => {
        dispatch(fetchUpdateFailure(err))
        throw new SubmissionError({ error: err.err, _error: err.err })
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
    .then(res => {
      if (res.ok) return res.json()
      throw new Error('Network response was not ok.')
    })
    .then(json => {
      if (json.error) return Promise.reject(json.error)
      const { slide, page } = json
      dispatch(pageActions.fetchUpdateSuccess(page))
      dispatch(fetchDeleteSuccess(slide._id))
    })
    .catch(err => {
      dispatch(fetchDeleteFailure(err))
      throw new SubmissionError({ ...err, _error: 'Delete failed!' })
    })
  }
}

export const deletes = (items) => ({ type: DELETES, items })

export const toggleCarousel = () => ({ type: TOGGLE })

export const startEdit = (_id) => ({ type: START_EDIT, _id })
export const stopEdit = (_id) => ({ type: STOP_EDIT, _id })
