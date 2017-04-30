import { SubmissionError } from 'redux-form'


export const pageError = (error) => {
  return {
    type: 'ERROR',
    error
  };
}



// Create Features
export const addPage = (page) => {
  return {
    type: 'ADD_PAGE',
    page
  }
}
export const startAddPage = (values) => {
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
        if (json.error) {
          return Promise.reject(json)
        }
        dispatch(addPage(json))
      })
      .catch(err => {
        throw new SubmissionError({ error: err.error, _error: err.error })
    })
  }
}



// Read Features
export const fetchPages = (pages) => ({
  type: 'FETCH_PAGE',
  pages
})
export const startFetchPages = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_PAGES' })
    return fetch(`/api/pages/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        dispatch(fetchPages(json))
      })
      .catch(err => console.log(err))
  }
}



// Update Product
export const updatePage = (update) => {
  console.log(update)
  return {
    type: 'UPDATE_PAGE',
    update
  }
}
export const startUpdatePage = (pageId, update) => {
  console.log(update)
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
      .then(json => dispatch(updatePage(json)))
      .catch(err => dispatch(pageError(err)))
  }
}



// Delete Product
export const deletePage = (_id) => {
  return {
    type: 'DELETE_PAGE',
    _id
  }
}
export const startDeletePage = (_id) => {
  console.log(_id)
  return (dispatch, getState) => {
    return fetch(`/api/pages/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => dispatch(deletePage(json._id)))
      .catch(err => console.log(err))
  }
}




// Search
export const searchProducts = (searchProductsText) => {
  return {
    type: 'SEARCH_PRODUCTS',
    searchProductsText
  }
}
