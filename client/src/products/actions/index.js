// Create Product
export const addProduct = (product) => {
  console.log('adding ')
  return {
    type: 'ADD_PRODUCT',
    product
  }
}
export const startAddProduct = (product) => {
  console.log(product)
  return (dispatch, getState) => {
    const newProduct = {
      name: product.name,
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
export const startUpdateProduct = (values) => {
  const { _id, name, description, price } = values
  console.log(_id)
  const updates = { name, description, price }
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
        dispatch(updateProduct(json.product._id, json.product))
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




// Create Cart
export const addToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    product
  }
}
export const startAddToCart = (product) => {
  return (dispatch, getState) => {
    return fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cart': localStorage.getItem('cart'),
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        localStorage.setItem('cart', json._id)
        dispatch(addToCart(json))
      })
      .catch(err => console.log(err))
  }
}


// Read Cart
export const fetchCartProducts = (products) => ({
  type: 'FETCH_PRODUCTS',
  products
})
export const startFetchCartProducts = () => {
  console.log('fetching cart')
  return (dispatch, getState) => {
    return fetch('/api/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      }
    })
      .then(res => res.json())
      .then(json => dispatch(fetchCartProducts(json)))
      .catch(err => console.log(err))
  }
}



// Update Cart
export const updateCartProduct = (_id, updates) => {
  return {
    type: 'UPDATE_CART_PRODUCT',
    _id,
    updates
  }
}
export const startUpdateCartProduct = (values) => {
  const { _id, productId, productQty } = values
  const updates = { productId, productQty }
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
        dispatch(updateCartProduct(json.product._id, json.product))
      })
      .catch(err => console.log(err))
  }
}


// Delete Product
export const deleteCartProduct = (_id) => {
  return {
    type: 'DELETE_CART_PRODUCT',
    _id
  }
}
export const startDeleteCartProduct = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/carts/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => dispatch(deleteCartProduct(json.product._id)))
      .catch(err => console.log(err))
  }
}
