// Create Cart
export const addItem = (item) => {
  console.log(item)
  return {
    type: 'ADD_ITEM',
    item
  }
}

export const deleteItem = (item) => {
  return {
    type: 'DELETE_ITEM',
    item
  }
}



// Update Cart
export const updateItem = (productId, productQty) => {
  const updates = { productId, productQty}
  return {
    type: 'UPDATE_CART',
    updates
  }
}


// Delete Product
export const deleteCart = (_id) => {
  return {
    type: 'DELETE_CART',
    _id
  }
}
export const startDeleteCart = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/carts/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => dispatch(deleteCart(json.cart._id)))
      .catch(err => console.log(err))
  }
}




// Search
export const searchCarts = (searchCartsText) => {
  return {
    type: 'SEARCH_CARTS',
    searchCartsText
  }
}
