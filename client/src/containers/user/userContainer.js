import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './user.css'

const userContainer = (ComposedComponent) => {
  class UserContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        params,
        primary1Color,
        user,
      } = this.props
      const props = {
        dispatch,
        params,
        primary1Color,
        user
      }
      return (
        isFetching ? null :  <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({
    brand,
    user
  }, {
    params
  }) => ({
    isFetching: brand.isFetching || user.isFetching ? true : false,
    params,
    primary1Color: brand.palette.values.primary1Color,
    user
  })
  UserContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    params: PropTypes.object,
    primary1Color: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(UserContainer)
}

export default userContainer
