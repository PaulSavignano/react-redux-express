import moment from 'moment'
import { browserHistory } from 'react-router'


// Create
export const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  }
}
export const startAddTodo = (todo) => {
  return (dispatch, getState) => {
    const newTodo = {
      text: todo.text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    }
    return fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(json => {
        dispatch(addTodo(json))
      })
      .catch(err => {
        console.log(err)
      })
  }
}



// Read
export const fetchTodos = (todos) => ({
  type: 'FETCH_TODOS',
  todos
})
export const startFetchTodos = () => {
  return (dispatch, getState) => {
    return fetch('/api/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      }
    })
      .then(res => res.json())
      .then(json => dispatch(fetchTodos(json)))
      .catch(err => {
        browserHistory.push('/signin')
        console.log(err)
      })
  }
}



// Update
export const updateTodo = (_id, updates) => {
  return {
    type: 'UPDATE_TODO',
    _id,
    updates
  }
}
export const startUpdateTodo = (_id, updates) => {
  return (dispatch, getState) => {
    return fetch(`/api/todos/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(updates)
    })
      .then(res => res.json())
      .then(json => {
        dispatch(updateTodo(json.todo._id, json.todo))
      })
      .catch(err => console.log(err))
  }
}



// Delete
export const deleteTodo = (_id) => {
  return {
    type: 'DELETE_TODO',
    _id
  }
}
export const startDeleteTodo = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/todos/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => dispatch(deleteTodo(json.todo._id)))
      .catch(err => console.log(err))
  }
}




export const searchTodos = (searchTodosText) => {
  return {
    type: 'SEARCH_TODOS',
    searchTodosText
  }
}
export const toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
  }
}
