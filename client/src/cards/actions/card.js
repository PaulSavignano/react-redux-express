import { SubmissionError } from 'redux-form'

const ADD = 'ADD_CARD'
const REQUEST = 'REQUEST_CARDS'
const RECEIVE = 'RECEIVE_CARDS'
const UPDATE = 'UPDATE_CARD'
const DELETE = 'DELETE_CARD'
const ERROR = 'ERROR_CARD'



// Create
const fetchAddCardSuccess = (item) => ({ type: ADD, item })
const fetchAddCardFailure = (error) => ({ type: ERROR, error })
export const fetchAddCard = (item) => {
  return (dispatch, getState) => {
    return fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(item)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchAddCardSuccess(json))
      })
      .catch(err => {
        dispatch(fetchAddCardFailure(err))
        throw new SubmissionError({ error: err.error, _error: err.error })
    })
  }
}



// Read
const fetchCardsRequest = () => ({ type: REQUEST })
const fetchCardsSuccess = (items) => ({ type: RECEIVE, items })
const fetchCardsFailure = (error) => ({ type: ERROR, error })
export const fetchCards = () => {
  return (dispatch, getState) => {
    dispatch(fetchCardsRequest())
    return fetch('/api/cards', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchCardsSuccess(json))
      })
      .catch(err => {
        dispatch(fetchCardsFailure(err))
      })


  }
}



// Update
const fetchUpdateCardSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateCardFailure = (error) => ({ type: ERROR, error })
export const fetchUpdateCard = (update) => {
  return (dispatch, getState) => {
    return fetch(`/api/cards/${update.cardId}`, {
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
        dispatch(fetchUpdateCardSuccess(json))
      })
      .catch(err => dispatch(fetchUpdateCardFailure(err)))
  }
}



// Delete
const fetchDeleteCardSuccess = (_id) => ({ type: DELETE, _id })
const fetchDeleteCardFailure = (error) => ({ type: ERROR, error })
export const fetchDeleteCard = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchDeleteCardSuccess(json._id))
      })
      .catch(err => dispatch(fetchDeleteCardFailure(err)))
  }
}
