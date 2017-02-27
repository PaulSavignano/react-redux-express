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

export const filterTodos = (todos, showCompleted, todoSearch) => {
  console.log(todoSearch)
  var filteredTodos = todos
  filteredTodos = filteredTodos.filter(todo => !todo.completed || showCompleted)
  filteredTodos = filteredTodos.filter(todo => {
    const text = todo.text.toLowerCase()
    return todoSearch.length === 0 || text.indexOf(todoSearch.toLowerCase()) > -1
  })
  filteredTodos.sort((a, b) => {
    if (a.completed && b.completed) {
      return -1
    } else if (a.completed && !b.completed) {
      return 1
    } else {
      return 0
    }
  })
  return filteredTodos
}
