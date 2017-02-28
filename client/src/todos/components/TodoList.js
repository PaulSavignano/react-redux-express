import React, { Component } from 'react'
import { connect } from 'react-redux'
import Todo from './Todo'
import { filterTodos } from '../api/todoAPI'
import { fetchTodos } from '../actions/index'

export class TodoList extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTodos())
  }
  render() {
    const { todos, showCompleted, searchTodos } = this.props
    const styles = {
      container: {
        width: '100%'
      }
    }
    return (
      todos.length > 0 ?
      <div style={styles.container}>
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
