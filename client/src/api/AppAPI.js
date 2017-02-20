export const addCart = (newCart) => {
  return fetch('/api/carts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCart)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const getCarts = () => {
  return fetch('/api/carts')
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const deleteCart = (_id) => {
  return fetch(`/api/carts/${_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}




export const addProduct = (newProduct) => {
  return fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
export const getProducts = () => {
  return fetch('/api/products')
    .then(res => res.json())
    .catch(err => console.log(err))
}
export const updateProduct = (update) => {
  return fetch(`/api/products/${update._id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
export const deleteProduct = (_id) => {
  return fetch(`/api/products/${_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}



export const addTodo = (newTodo) => {
  return fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
export const getTodos = () => {
  return fetch('/api/todos')
    .then(res => res.json())
    .catch(err => console.log(err))
}
export const updateTodo = (update) => {
  return fetch(`/api/todos/${update._id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
export const deleteTodo = (_id) => {
  return fetch(`/api/todos/${_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
