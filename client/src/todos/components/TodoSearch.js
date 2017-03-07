import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchTodos, toggleShowCompleted } from '../actions/index'

export class TodoSearch extends Component {
  render() {
    const { dispatch, showCompleted, searchTodosText } = this.props
    const styles = {
      search: {
        float: 'left',
      },
      expandableHolder: {
        width: '100%',
        maxWidth: '100%'
      },
      container: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '100%',
        minHeight: 'auto',
        alignItems: 'center'
      }
    }
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable" style={styles.container}>
            <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="searchTodos">
              <i className="material-icons">search</i>
            </label>
            <div className="mdl-textfield__expandable-holder" style={styles.expandableHolder}>
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
              <label className="mdl-textfield__label" htmlFor="searchTodos">Expandable Input</label>
            </div>
          </div>
          <div>
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="showCompleted">
              <input type="checkbox" id="showCompleted" className="mdl-checkbox__input" ref="showCompleted" checked={showCompleted} onChange={() => {
                dispatch(toggleShowCompleted())
              }}
              />
              <span className="mdl-checkbox__label">Show completed</span>
            </label>
          </div>
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
