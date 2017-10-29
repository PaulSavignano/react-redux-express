import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const footerContainer = (ComposedComponent) => {
  class FooterContainer extends Component {
    render() {
      const {
        business,
        isFetching,
        item,
        primary1Color
      } = this.props

      const {
        backgroundImage,
        values: {
          backgroundColor, borderBottom, borderTop
        }
      } = item
      const propsForParent = {
        style: {
          backgroundColor,
          backgroundImage: backgroundImage.src && `url(${backgroundImage.src})`,
          borderBottom,
          borderTop
        },
        className: backgroundImage.src && 'background-image'
      }
      const props = {
        business,
        item,
        primary1Color,
        propsForParent
      }
      return (
        !isFetching && item && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: {
      isFetching,
      footer,
      business,
      palette: {
        values: {
          primary1Color
        }
      }
    }
  }) => ({
    business,
    item: footer,
    isFetching,
    primary1Color
  })
  FooterContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    business: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    primary1Color: PropTypes.string,
    propsForParent: PropTypes.object,
  }
  return connect(mapStateToProps)(FooterContainer)
}

export default footerContainer
