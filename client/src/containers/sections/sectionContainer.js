import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const sectionContainer = (ComposedComponent) => {
  class SectionContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        item
      } = this.props
      const props = {
        dispatch,
        item,
      }
      return (
        !isFetching && item ? <ComposedComponent {...props} /> : null
      )
    }
  }
  const mapStateToProps = ({ sections: { items, isFetching } }, { sectionId }) => ({
    item: items.find(item => item._id === sectionId),
    isFetching,
  })
  SectionContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object,
    isFetching: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(SectionContainer)
}



export default sectionContainer
