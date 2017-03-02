import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoAdd from './TodoAdd'
import TodoSearch from './TodoSearch'

class TodosPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startFetchTodos())
  }
  render() {
    const styles = {
      container: {
        padding: 8,
      }
    }
    return (
      <main style={styles.container}>
        <h1>Todos</h1>
        <TodoSearch/>
        <TodoAdd />
        <br />
        <TodoList />
      </main>
    )
  }
}

export default TodosPage
