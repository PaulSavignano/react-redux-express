import { SubmissionError } from 'redux-form'

// Create Features
export const addPage = (page) => {
  return {
    type: 'ADD_PAGE',
    page
  }
}
export const startAddPage = (values, image) => {
  const page = {
    name: values.name,
    image,
    contents: { values }
  }
  return (dispatch, getState) => {
    return fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(page)
    })
      .then(res => res.json())
      .then(json => {
        dispatch(addPage(json))
      })
      .catch(err => {
      throw new SubmissionError({ error: err, _error: err })
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
export const updatePage = (updates) => {
  return {
    type: 'UPDATE_PAGE',
    updates
  }
}
export const startUpdatePage = (_id, updates) => {
  return (dispatch, getState) => {
    return fetch(`/api/pages/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(updates)
    })
      .then(res => res.json())
      .then(json => dispatch(updatePage(json, { status: 'Updated'})))
      .catch(err => dispatch(pageError(err)))
  }
}



// Delete Product
export const deleteProduct = (_id) => {
  return {
    type: 'DELETE_PAGE',
    _id
  }
}
export const startDeleteProduct = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/features/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => dispatch(deleteProduct(json.feature._id)))
      .catch(err => console.log(err))
  }
}





export const pageError = (error) => {
  return {
    type: 'ERROR',
    error
  };
}

// Search
export const searchProducts = (searchProductsText) => {
  return {
    type: 'SEARCH_PRODUCTS',
    searchProductsText
  }
}
