import React, { Component } from 'react'

class TodoSearch extends Component {
  handleSearch = () => {
    const showCompleted = this.refs.showCompleted.checked
    const todoSearch = this.refs.todoSearch.value
    this.props.onSearch(showCompleted, todoSearch)
  }
  render() {
    return (
      <div>
        <div>
          <input
            type="search"
            ref="todoSearch"
            placeholder="Search Todos"
            onChange={this.handleSearch}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              ref="showCompleted"
              onChange={this.handleSearch}
            />
          Show completed todos
          </label>
        </div>
      </div>
    )
  }
}

export default TodoSearch
