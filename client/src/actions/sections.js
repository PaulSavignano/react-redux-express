import { SubmissionError } from 'redux-form'

import handleAuthFetch from '../utils/handleAuthFetch'
import * as pageActions from './pages'
import { startEdit, stopEdit } from './editItem'

export const type = 'SECTION'
const route = 'sections'

const ERROR = `ERROR_${type}`

// Create
export const fetchAdd = (add) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}`,
      method: 'POST',
      body: add
    })
    .then(json => {
      const { editItem, page } = json
      dispatch(pageActions.fetchUpdateSuccess(page))
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: ERROR, error })
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}


// Update
export const fetchUpdate = ({ _id, path, update }) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/${_id}/${path}`,
      method: 'PATCH',
      body: update
    })
    .then(json => {
      const { page } = json
      dispatch(pageActions.fetchUpdateSuccess(page))
      return dispatch(stopEdit())
    })
    .catch(error => {
      dispatch({ type: ERROR, error })
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}



// Delete
export const fetchDelete = (_id) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `/api/${route}/${_id}`,
      method: 'DELETE',
      body: null
    })
    .then(json => {
      const { page } = json
      dispatch(pageActions.fetchUpdateSuccess(page))
      return dispatch(stopEdit())
    })
    .catch(error => {
      dispatch({ type: ERROR, error })
      throw new SubmissionError({ ...error, _error: 'Delete failed!' })
    })
  }
}
