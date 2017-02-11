import React, { Component } from 'react'

class TodoSearch extends Component {
  handleSearch = () => {
    const showCompleted = this.refs.showCompleted.checked
    const searchText = this.refs.searchText.value
    this.props.onSearch(showCompleted, searchText)
  }
  render() {
    return (
      <div>
        <div>
          <input
            type="search"
            ref="searchText"
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
