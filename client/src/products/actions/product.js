// Create Product
const fetchAddProductSuccess = (product) => ({ type: 'ADD_PRODUCT', product })
const fetchAddProductFailure = (error) => ({ type: 'ERROR', error })
export const fetchAddProduct = (product) => {
  return (dispatch, getState) => {
    return fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject()
        dispatch(fetchAddProductSuccess(json))
      })
      .catch(err => dispatch(fetchAddProductFailure(err)))
  }
}



// Read Product
const fetchProductsRequest = () => ({ type: 'REQUEST' })
const fetchProductsSuccess = (products) => ({ type: 'FETCH_PRODUCTS', products })
const fetchProductsFailure = (error) => ({ type: 'ERROR', error })
export const fetchProducts = () => {
  return (dispatch, getState) => {
    dispatch(fetchProductsRequest())
    return fetch('/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json.error) return Promise.reject()
        dispatch(fetchProductsSuccess(json))
      })
      .catch(err => dispatch(fetchProductsFailure(err)))
  }
}



// Update Product
const fetchUpdateProductSuccess = (product) => ({ type: 'UPDATE_PRODUCT', product })
const fetchUpdateProductFailure = (error) => ({ type: 'ERROR', error })
export const fetchUpdateProduct = (product) => {
  const { _id } = product
  return (dispatch, getState) => {
    return fetch(`/api/products/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject()
        dispatch(fetchUpdateProductSuccess(json))
      })
      .catch(err => dispatch(fetchUpdateProductFailure(err)))
  }
}



// Delete Product
const fetchDeleteProductSuccess = (_id) => ({ type: 'DELETE_PRODUCT', _id })
const fetchDeleteProductFailure = (error) => ({ type: 'ERROR', error })
export const fetchDeleteProduct = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/products/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject()
        dispatch(fetchDeleteProductSuccess(json._id))
      })
      .catch(err => dispatch(fetchDeleteProductFailure(err)))
  }
}








// Search
export const searchProducts = (searchProductsText) => {
  return {
    type: 'SEARCH_PRODUCTS',
    searchProductsText
  }
}
