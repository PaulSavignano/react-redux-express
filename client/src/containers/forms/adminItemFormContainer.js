import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const adminItemFormContainer = (ComposedComponent) => {
  class AdminItemFormContainer extends Component {
    render() {
      const {
        editItem
      } = this.props
      const props = {
        editItem
      }
      return (
        !editItem.editing ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ editItem }) => ({ editItem })
  AdminItemFormContainer.propTypes = {
    editItem: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(AdminItemFormContainer)
}

export default adminItemFormContainer
