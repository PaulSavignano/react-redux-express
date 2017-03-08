import React, { Component } from 'react'
import { connect } from 'react-redux'
import Todo from './Todo'
import { filterTodos } from '../api/todoAPI'
import { startFetchTodos } from '../actions/index'

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
  console.log(state)
  return state
}

export default connect(mapStateToProps)(TodoList)
