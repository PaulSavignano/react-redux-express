import { SubmissionError } from 'redux-form'

import * as sectionActions from './sections'

export const type = 'SLIDES'
const route = 'slides'

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
        const { slide, section } = json
        dispatch(fetchAddSuccess(slide))
        dispatch(sectionActions.fetchUpdateSuccess(section))
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
      const { slide, section } = json
      dispatch(sectionActions.fetchUpdateSuccess(section))
      dispatch(fetchDeleteSuccess(slide._id))
    })
    .catch(err => {
      dispatch(fetchDeleteFailure(err))
      throw new SubmissionError({ ...err, _error: 'Delete failed!' })
    })
  }
}

export const deletes = (items) => ({ type: DELETES, items })
