import uuidV1 from 'uuid/v1'
import moment from 'moment'

// Create
export const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  }
}
export const postTodo = (todo) => {
  return (dispatch, getState) => {
    const newTodo = {
      text: todo.text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    }
    return fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(json => {
        dispatch(addTodo(json))
      })
      .catch(err => console.log(err))
  }
}


// Read
export const receiveTodos = (todos) => ({
  type: 'FETCH_TODOS',
  todos
})
export const fetchTodos = () => {
  return (dispatch, getState) => {
    return fetch('/api/todos')
      .then(res => res.json())
      .then(json => dispatch(receiveTodos(json)))
      .catch(err => console.log(err))
  }
}


// Update
export const updateTodo = (todo) => {
  return {
    type: 'UPDATE_TODO',
    todo
  }
}
export const patchTodo = (update) => {
  return (dispatch, getState) => {
    return fetch(`/api/todos/${update._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.todo)
        dispatch(updateTodo(json.todo))
      })
      .catch(err => console.log(err))
  }
}


// Delete
export const removeTodo = (_id) => {
  return {
    type: 'DELETE_TODO',
    _id
  }
}
export const deleteTodo = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/todos/${_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => dispatch(removeTodo(json.todo._id)))
      .catch(err => console.log(err))
  }
}




export const searchTodos = (searchText) => {
  return {
    type: 'SEARCH_TODOS',
    searchText
  }
}

export const toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
  }
}

export const toggleTodo = (_id) => {
  return {
    type: 'TOGGLE_TODO',
    _id
  }
}
