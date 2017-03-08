import moment from 'moment'


// Create
export const addProduct = (product) => {
  return {
    type: 'ADD_TODO',
    product
  }
}
export const startAddProduct = (product) => {
  return (dispatch, getState) => {
    const newProduct = {
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
    }
    return fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(json => {
        dispatch(addProduct(json))
      })
      .catch(err => console.log(err))
  }
}



// Read
export const fetchProducts = (products) => ({
  type: 'FETCH_TODOS',
  products
})
export const startFetchProducts = () => {
  return (dispatch, getState) => {
    return fetch('/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      }
    })
      .then(res => res.json())
      .then(json => dispatch(fetchProducts(json)))
      .catch(err => console.log(err))
  }
}



// Update
export const updateProduct = (_id, updates) => {
  return {
    type: 'UPDATE_PRODUCT',
    _id,
    updates
  }
}
export const startUpdateProduct = (_id, updates) => {
  return (dispatch, getState) => {
    return fetch(`/api/products/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(updates)
    })
      .then(res => res.json())
      .then(json => {
        dispatch(updateProduct(json.product._id, json.product))
      })
      .catch(err => console.log(err))
  }
}



// Delete
export const deleteProduct = (_id) => {
  return {
    type: 'DELETE_PRODUCT',
    _id
  }
}
export const startDeleteProduct = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/products/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => dispatch(deleteProduct(json.product._id)))
      .catch(err => console.log(err))
  }
}




export const searchProducts = (searchProductsText) => {
  return {
    type: 'SEARCH_PRODUCTS',
    searchProductsText
  }
}
