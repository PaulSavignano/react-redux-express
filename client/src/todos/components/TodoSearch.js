import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchTodos, toggleShowCompleted } from '../actions/index'

export class TodoSearch extends Component {
  render() {
    let searchTodos
    const { dispatch, showCompleted, searchTodosText } = this.props
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
            <input
              className="mdl-textfield__input"
              type="text"
              id="searchTodos"
              value={searchTodosText}
              ref="searchText"
              onChange={(e) => {
                dispatch(searchTodos(e.target.value))
              }}
            />
            <label className="mdl-textfield__label" style={styles.input} htmlFor="searchTodos">Expandable Input</label>
          </div>
          <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="showCompleted">
            <input type="checkbox" id="showCompleted" className="mdl-checkbox__input" ref="showCompleted" checked={showCompleted} onChange={() => {
              dispatch(toggleShowCompleted())
            }}
            />
            <span className="mdl-checkbox__label">Show completed</span>
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  showCompleted: state.showCompleted,
  searchTodos: state.searchTodos
})

export default connect(mapStateToProps)(TodoSearch)
