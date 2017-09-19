import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const contactFormContainer = (ComposedComponent) => {
  class ContactFormContainer extends Component {
    state = {
      elevation: null
    }
    componentWillMount() {
      const { values } = this.props.item
      if (values.elevation) this.setState({ elevation: values.elevation })
    }
    handleMouseEnter = () => this.setState({ elevation: 4 })
    handleMouseLeave = () => this.setState({ elevation: 1 })
    render() {
      const { elevation } = this.state
      const {
        dispatch,
        isFetching,
        item,
        initialValues,
        phone
      } = this.props
      const props = {
        dispatch,
        elevation,
        item,
        initialValues,
        phone
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  ContactFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object
  }
  return connect(({
    brand: { isFetching, business: { values: { phone }}},
    user
  }, {
    item
  }) => ({
    isFetching: user.isFetching || isFetching ? true : false,
    item,
    initialValues: user.values,
    phone,
  }))(ContactFormContainer)
}

export default contactFormContainer
