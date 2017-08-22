import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const heroContainer = (ComposedComponent) => {
  class HeroContainer extends Component {
    render() {
      const {
        hero,
        dispatch,
        isFetching,
        item,
        typography
      } = this.props
      const props = {
        hero,
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
    brand: { isFetching, hero, typography }
  }, {
    item
  }) => {
    const hasHeading = item.values.h1Text || item.values.h2Text || item.values.h3Text ? true : false
    const hasMedia = item.image.src || item.iframe ? true : false
    const hasParagraph = item.values.pText && item.values.pText.length > 8 ? true : false
    const hasButtons = item.values.button1Text ? true : false
    return {
      hasHeading,
      hasMedia,
      hasParagraph,
      hasButtons,
      hero,
      isFetching,
      typography
    }
  }
  HeroContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    hasButtons: PropTypes.bool.isRequired,
    hasHeading: PropTypes.bool.isRequired,
    hasMedia: PropTypes.bool.isRequired,
    hasParagraph: PropTypes.bool.isRequired,
    hero: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(HeroContainer)
}

export default heroContainer
