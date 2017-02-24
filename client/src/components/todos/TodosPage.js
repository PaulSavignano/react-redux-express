import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoAdd from './TodoAdd'
import TodoSearch from './TodoSearch'

class TodosPage extends Component {
  render() {
    const styles = {
      grid: {
        maxWidth: 900,
        margin: 'auto'
      }
    }
    return (
      <main className="mdl-layout__content">
        <div className="mdl-grid" style={styles.grid}>
          <h1>Todos</h1>
          <TodoSearch onSearch={this.props.onSearch}/>
          <TodoAdd onTodoAdd={this.props.onTodoAdd} />
          <br />
          <TodoList
            todos={this.props.todos}
            onToggle={this.props.onToggle}
            onTodoDelete={this.props.onTodoDelete}
            onTodoUpdate={this.props.onTodoUpdate}
          />
        </div>
      </main>
    )
  }
}

export default TodosPage
