import { SubmissionError } from 'redux-form'


// Create
const fetchAddPageSuccess = (page) => ({ type: 'ADD_PAGE', page })
const fetchAddPageFailure = (error) => ({ type: 'ERROR', error })
export const fetchAddPage = (values) => {
  return (dispatch, getState) => {
    return fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json)
        dispatch(fetchAddPageSuccess(json))
      })
      .catch(err => {
        dispatch(fetchAddPageFailure(err))
        throw new SubmissionError({ error: err.error, _error: err.error })
    })
  }
}



// Read
const fetchPagesRequest = () => ({ type: 'REQUEST' })
const fetchPagesSuccess = (pages) => ({ type: 'FETCH_PAGES', pages })
const fetchPagesFailure = (error) => ({ type: 'ERROR', error })
export const fetchPages = () => {
  return (dispatch, getState) => {
    dispatch(fetchPagesRequest())
    return fetch(`/api/pages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json)
        dispatch(fetchPagesSuccess(json))
      })
      .catch(err => dispatch(fetchPagesFailure(err)))
  }
}



// Update
const fetchUpdatePageSuccess = (update) => ({ type: 'UPDATE_PAGE', update })
const fetchUpdatePageFailure = (error) => ({ type: 'ERROR', error })
export const fetchUpdatePage = (pageId, update) => {
  return (dispatch, getState) => {
    return fetch(`/api/pages/${pageId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject()
        dispatch(fetchUpdatePageSuccess(json))
      })
      .catch(err => dispatch(fetchUpdatePageFailure(err)))
  }
}



// Delete
const fetchDeletePageSuccess = (_id) => ({ type: 'DELETE_PAGE', _id })
const fetchDeletePageFailure = (error) => ({ type: 'ERROR', error })
export const fetchDelete = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/pages/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject()
        dispatch(fetchDeletePageSuccess(json._id))
      })
      .catch(err => dispatch(fetchDeletePageFailure(err)))
  }
}




// Search
export const searchProducts = (searchProductsText) => {
  return {
    type: 'SEARCH_PRODUCTS',
    searchProductsText
  }
}
