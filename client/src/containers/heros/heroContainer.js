import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const heroContainer = (ComposedComponent) => {
  class HeroContainer extends Component {
    render() {
      const {
        heroStyle,
        dispatch,
        isFetching,
        item,
        typography
      } = this.props
      const props = {
        heroStyle,
        dispatch,
        item,
        typography
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, heroStyle, typography },
    editItem
  }, {
    item
  }) => ({
    heroStyle,
    editItem: editItem.kind === 'HERO' ? editItem : null,
    hasButtons: item.values.button1Text ? true : false,
    hasHeading: item.values.h1Text || item.values.h2Text || item.values.h3Text ? true : false,
    hasMedia: item.image.src || item.values.iframe ? true : false,
    hasParagraph: item.values.pText && item.values.pText.length > 8 ? true : false,
    isFetching,
    item,
    typography
  })
  HeroContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    hasButtons: PropTypes.bool.isRequired,
    hasHeading: PropTypes.bool.isRequired,
    hasMedia: PropTypes.bool.isRequired,
    hasParagraph: PropTypes.bool.isRequired,
    heroStyle: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(HeroContainer)
}

export default heroContainer
