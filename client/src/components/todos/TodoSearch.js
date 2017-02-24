import React, { Component } from 'react'

const styles = {
  container: {
    margin: '0 auto'
  },
  input: {
    float: 'left'
  }
}

class TodoSearch extends Component {
  handleSearch = () => {
    const showCompleted = this.refs.showCompleted.checked
    const searchText = this.refs.searchText.value
    this.props.onSearch(showCompleted, searchText)
  }
  render() {
    const styles = {
      container: {
        margin: '0 auto'
      },
      search: {
        float: 'left',
      }
    }
    return (
      <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet">
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable" style={styles.search}>
          <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <div className="mdl-textfield__expandable-holder">
            <input className="mdl-textfield__input" type="text" id="search" ref="searchText" onChange={this.handleSearch} />
            <label className="mdl-textfield__label" style={styles.input} htmlFor="sample-expandable">Expandable Input</label>
          </div>
          <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" className="mdl-checkbox__input" ref="showCompleted" onChange={this.handleSearch} />
            <span className="mdl-checkbox__label">Show completed</span>
          </label>
        </div>
      </div>
    )
  }
}

export default TodoSearch
