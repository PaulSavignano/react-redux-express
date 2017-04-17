// Create Features
export const addPage = (page) => {
  return {
    type: 'ADD_PAGE',
    page
  }
}
export const startAddPage = (name) => {
  return (dispatch, getState) => {
    return fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(json => {
        dispatch(addPage(json))
      })
      .catch(err => console.log(err))
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
        console.log(json)
        dispatch(fetchPages(json))
      })
      .catch(err => console.log(err))
  }
}



// Update Product
export const updateProduct = (_id, updates) => {
  return {
    type: 'UPDATE_PAGE',
    _id,
    updates
  }
}
export const startUpdatePage = (values, image) => {
  const { _id, name, description, price } = values
  const updates = { name, description, price, image }
  return (dispatch, getState) => {
    return fetch(`/api/features/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(updates)
    })
      .then(res => res.json())
      .then(json => {
        dispatch(updateProduct(json.feature._id, json.feature))
      })
      .catch(err => console.log(err))
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



// Search
export const searchProducts = (searchProductsText) => {
  return {
    type: 'SEARCH_PRODUCTS',
    searchProductsText
  }
}
