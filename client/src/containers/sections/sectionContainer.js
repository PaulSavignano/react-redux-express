import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const sectionContainer = (ComposedComponent) => {
  class SectionContainer extends Component {
    render() {
      const {
        autoplay,
        dispatch,
        item,
        pageId,
        pageSlug,
        textColor
      } = this.props
      const {
        image,
        values: {
          alignItems,
          containerBackgroundColor,
          flexFlow,
          justifyContent,
          maxWidth,
          minHeight,
          margin,
          padding,
        }
      } = item
      const props = {
        autoplay,
        dispatch,
        item,
        pageId,
        pageSlug,
        containerProps: {
          style: {
            backgroundImage: image.src && `url(${image.src})`,
            backgroundColor: containerBackgroundColor,
          },
          className: image.src && 'background-image'
        },
        sectionProps: {
          style: {
            alignItems,
            flexFlow,
            justifyContent,
            maxWidth,
            minHeight,
            margin,
            padding
          }
        },
        textColor
      }
      return (
        <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    swipeables: { autoplay },
    brand: { palette: { values: { textColor }}}
  }, {
    item, pageId, pageSlug
  }) => ({
    autoplay,
    item,
    pageId,
    pageSlug,
    textColor
  })
  SectionContainer.propTypes = {
    autoplay: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    pageId: PropTypes.string.isRequired,
    pageSlug: PropTypes.string.isRequired,
    textColor: PropTypes.string,
  }
  return connect(mapStateToProps)(SectionContainer)
}

export default sectionContainer
