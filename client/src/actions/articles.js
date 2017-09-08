import { SubmissionError } from 'redux-form'

import * as pageActions from './pages'
import { startEdit, stopEdit } from './editItem'

export const type = 'ARTICLE'
const route = 'articles'

const ERROR = `ERROR_${type}`

// Create
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
        const { editItem, page } = json
        dispatch(pageActions.fetchUpdateSuccess(page))
        return dispatch(startEdit({ item: editItem, kind: 'ARTICLE' }))
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: ERROR, error })
        throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}

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
        const { page } = json
        dispatch(pageActions.fetchUpdateSuccess(page))
        dispatch(stopEdit())
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: ERROR, error })
        throw new SubmissionError({ ...error, _error: 'Update failed!' })
      })
  }
}



// Delete
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
        const { page } = json
        dispatch(pageActions.fetchUpdateSuccess(page))
        dispatch(stopEdit())
      })
      .catch(error => {
        dispatch({ type: ERROR, error })
        throw new SubmissionError({ ...error, _error: 'Delete failed!' })
      })
  }
}
