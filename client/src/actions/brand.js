import { SubmissionError } from 'redux-form'

export const type = 'BRAND'
const route = 'brands'

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
        console.log(json)
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchAddSuccess(json))
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchAddFailure(err))
        throw new SubmissionError({ ...err, _error: 'Update failed!' })
    })
  }
}



// Read
const fetchBrandRequest = () => ({ type: REQUEST })
const fetchBrandSuccess = (items) => ({ type: RECEIVE, items })
const fetchBrandFailure = (error) => ({ type: ERROR, error })
export const fetchBrand = () => {
  return (dispatch, getState) => {
    dispatch(fetchBrandRequest())
    return fetch(`/api/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchBrandSuccess(json[0]))
      })
      .catch(err => {
        dispatch(fetchBrandFailure(err))
      })
  }
}



// Update
const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateFailure = (error) => ({ type: ERROR, error })
export const fetchUpdate = (path, update) => {
  console.log(path, update)
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${path}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchUpdateSuccess(json))
      })
      .catch(err => {
        console.error(err)
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
        dispatch(fetchDeleteSuccess(json._id))
      })
      .catch(err => {
        dispatch(fetchDeleteFailure(err))
        throw new SubmissionError({ ...err, _error: 'Delete failed!' })
      })
  }
}
