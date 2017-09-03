import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './users.css'

const usersContainer = (ComposedComponent) => {
  class UsersContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        users,
      } = this.props
      const props = {
        dispatch,
        users
      }
      return (
        isFetching ? null :  <ComposedComponent {...props} />
      )
    }
  }
  UsersContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
  }
  return connect(
    ({
      users: { isFetching, items }
    }) => ({
      isFetching,
      users: items
    })
  )(UsersContainer)
}

export default usersContainer
