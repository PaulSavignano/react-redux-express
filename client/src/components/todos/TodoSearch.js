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
    return (
      <div className="demo-card-wide mdl-card mdl-shadow--2dp" style={styles.container}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Search todos</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <form onSubmit={this.handleSubmit}>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable" style={styles.input}>
              <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="search" ref="searchText" onChange={this.handleSearch} />
                <label className="mdl-textfield__label" htmlFor="sample-expandable">Expandable Input</label>
              </div>
            </div>

          </form>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" className="mdl-checkbox__input" ref="showCompleted" onChange={this.handleSearch} />
            <span className="mdl-checkbox__label">Show completed</span>
          </label>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Search
          </a>
        </div>
      </div>
    )
  }
}

export default TodoSearch
