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
        typography
      } = this.props
      const props = {
        dispatch,
        elevation,
        item,
        typography
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, typography }
  }, {
    item
  }) => ({
    isFetching,
    item,
    typography
  })
  ContactFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(ContactFormContainer)
}

export default contactFormContainer
