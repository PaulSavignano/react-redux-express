import { SubmissionError } from 'redux-form'

import * as articleActions from './articles'
import * as cardActions from './cards'
import * as carouselActions from './carousels'
import * as heroActions from './heros'
import * as pageActions from './pages'


export const type = 'SECTION'
const route = 'sections'

const START_EDIT = `START_EDIT_${type}`
const STOP_EDIT = `STOP_EDIT_${type}`
const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}S`
const RECEIVE = `RECEIVE_${type}S`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const ERROR = `ERROR_${type}`

// Create
const fetchAddSuccess = (editItem) => ({ type: ADD, editItem })
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
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        const { section, page } = json
        dispatch(fetchAddSuccess({ editItem: section }))
        dispatch(pageActions.fetchUpdateSuccess(page))
      })
      .catch(err => {
        dispatch(fetchAddFailure(err))
        throw new SubmissionError({ ...err, _error: 'Update failed!' })
    })
  }
}



// Update
export const fetchUpdateSuccess = (editItem) => ({ type: UPDATE, editItem })
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
        const { section, page } = json
        dispatch(fetchUpdateSuccess({ editItem: section }))
        dispatch(pageActions.fetchUpdateSuccess(page))
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchUpdateFailure(err))
        throw new SubmissionError({ ...err, _error: 'Update failed!' })
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
        const { section, page } = json
        dispatch(fetchDeleteSuccess(section._id))
        dispatch(pageActions.fetchUpdateSuccess(page))
      })
      .catch(err => {
        console.error(err)
        dispatch(fetchDeleteFailure(err))
        throw new SubmissionError({ ...err, _error: 'Delete failed!' })
      })
  }
}


export const startEdit = (editItem) => ({ type: START_EDIT, editItem })
export const stopEdit = () => ({ type: STOP_EDIT })
