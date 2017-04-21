// Create Product
export const addProduct = (product) => {
  return {
    type: 'ADD_PRODUCT',
    product
  }
}
export const startAddProduct = (product, image) => {
  return (dispatch, getState) => {
    const newProduct = {
      name: product.name,
      image,
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



// Read Product
export const fetchProducts = (products) => ({
  type: 'FETCH_PRODUCTS',
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



// Update Product
export const updateProduct = (_id, updates) => {
  return {
    type: 'UPDATE_PRODUCT',
    _id,
    updates
  }
}
export const startUpdateProduct = (values, image) => {
  console.log(values)
  const { _id, name, description, price } = values
  const updates = { name, description, price, image }
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
        console.log(json)
        dispatch(updateProduct(json._id, json.product))
      })
      .catch(err => console.log(err))
  }
}



// Delete Product
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



// Search
export const searchProducts = (searchProductsText) => {
  return {
    type: 'SEARCH_PRODUCTS',
    searchProductsText
  }
}
