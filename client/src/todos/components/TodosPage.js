import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoAdd from './TodoAdd'
import TodoSearch from './TodoSearch'

class TodosPage extends Component {
  render() {
    return (
      <div className="android-more-section">
        <div className="android-section-title mdl-typography--display-1-color-contrast">Todos</div>
        <TodoSearch/>
        <TodoAdd />
        <TodoList />
      </div>
    )
  }
}

export default TodosPage
