import React, { Component } from 'react'
import { connect } from 'react-redux'
import Todo from './Todo'
import { startFetchTodos } from '../actions/index'

export const filterTodos = (todos, showCompleted, searchTodos) => {
  var filteredTodos = todos
  filteredTodos = filteredTodos.filter(todo => {
    return !todo.completed || showCompleted
  })
  filteredTodos = filteredTodos.filter(todo => {
    const text = todo.text.toLowerCase()
    return searchTodos.length === 0 || text.indexOf(searchTodos.toLowerCase()) > -1
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

export class TodoList extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startFetchTodos())
  }
  render() {
    const { todos, showCompleted, searchTodos } = this.props
    return (
      todos.length > 0 ?
      <div className="mdl-grid">
        {filterTodos(todos, showCompleted, searchTodos).map(todo => (
          <Todo
            key={todo._id}
            {...todo}
          />
        ))}
      </div> :
      <div><p className="container__message">No todos yet</p></div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(TodoList)
