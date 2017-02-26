import React, { Component } from 'react'
import { connect } from 'react-redux'
import Todo from './Todo'

export class TodoList extends Component {
  render() {
    const { todos } = this.props
    const style = {
      width: 900
    }
    return (
      todos.length > 0 ?
      <div>
        {todos.map(todo => (
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

const mapStateToProps = (state) => ({
  todos: state.todos
})

export default connect(mapStateToProps)(TodoList)
