import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './user.css'

const userHOC = (ComposedComponent) => {
  class UserHOC extends Component {
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
    user
  }, {
    match: { params: { resetToken }},
  }) => ({
    isFetching: user.isFetching,
    resetToken,
    user
  })
  UserHOC.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    resetToken: PropTypes.string,
    user: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(UserHOC)
}

export default userHOC
