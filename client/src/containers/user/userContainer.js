import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './user.css'

const userContainer = (ComposedComponent) => {
  class UserContainer extends Component {
    render() {
      const {
        isFetching
      } = this.props
      return (
        isFetching ? null :  <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({
    brand,
    user
  }) => ({
    isFetching: brand.isFetching || user.isFetching ? true : false,
    primary1Color: brand.palette.values.primary1Color,
    user
  })
  UserContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    primary1Color: PropTypes.string,
    user: PropTypes.object
  }
  return connect(mapStateToProps)(UserContainer)
}

export default userContainer
