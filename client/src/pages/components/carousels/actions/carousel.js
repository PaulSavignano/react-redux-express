import { SubmissionError } from 'redux-form'

const ADD = 'ADD_CAROUSEL'
const REQUEST = 'REQUEST_CARDOUSEL'
const RECEIVE = 'RECEIVE_CARDOUSEL'
const UPDATE = 'UPDATE_CAROUSEL'
const DELETE = 'DELETE_CAROUSEL'
const ERROR = 'ERROR_CAROUSEL'



// Create
const fetchAddCarouselSuccess = (item) => ({ type: ADD, item })
const fetchAddCarouselFailure = (error) => ({ type: ERROR, error })
export const fetchAddCard = (item) => {
  return (dispatch, getState) => {
    return fetch('/api/carousels', {
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
        dispatch(fetchAddCarouselSuccess(json))
      })
      .catch(err => {
        dispatch(fetchAddCarouselFailure(err))
        throw new SubmissionError({ error: err.error, _error: err.error })
    })
  }
}



// Read
const fetchCarouselsRequest = () => ({ type: REQUEST })
const fetchCarouselsSuccess = (items) => ({ type: RECEIVE, items })
const fetchCarouselsFailure = (error) => ({ type: ERROR, error })
export const fetchCards = () => {
  return (dispatch, getState) => {
    dispatch(fetchCarouselsRequest())
    return fetch('/api/carousels', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchCarouselsSuccess(json))
      })
      .catch(err => {
        dispatch(fetchCarouselsFailure(err))
      })


  }
}



// Update
const fetchUpdateCarouselSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateCarouselFailure = (error) => ({ type: ERROR, error })
export const fetchUpdateCarousel = (update) => {
  return (dispatch, getState) => {
    return fetch(`/api/carousels/${update.cardId}`, {
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
        dispatch(fetchUpdateCarouselSuccess(json))
      })
      .catch(err => dispatch(fetchUpdateCarouselFailure(err)))
  }
}



// Delete
const fetchDeleteCarouselSuccess = (_id) => ({ type: DELETE, _id })
const fetchDeleteCarouselFailure = (error) => ({ type: ERROR, error })
export const fetchDeleteCarousel = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/carousels/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchDeleteCarouselSuccess(json._id))
      })
      .catch(err => dispatch(fetchDeleteCarouselFailure(err)))
  }
}
