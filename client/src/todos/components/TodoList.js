import React, { Component } from 'react'
import { connect } from 'react-redux'
import Todo from './Todo'
import { filterTodos } from '../api/todoAPI'

export class TodoList extends Component {
  render() {
    const { todos, showCompleted, todoSearch } = this.props
    console.log(this.props)
    const style = {
      width: 900
    }
    return (
      todos.length > 0 ?
      <div>
        {filterTodos(todos, showCompleted, todoSearch).map(todo => (
          <Todo
            key={todo.uuid}
            {...todo}
            onTodoDelete={this.props.onTodoDelete}
            onTodoUpdate={this.props.onTodoUpdate}
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
