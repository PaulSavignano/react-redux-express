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
      } = this.props
      const {
        image,
        values: {
          alignItems,
          backgroundColor,
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
        style: {
          alignItems,
          backgroundColor,
          backgroundImage: image.src && `url(${image.src})`,
          flexFlow,
          justifyContent,
          maxWidth,
          minHeight,
          margin,
          padding
        }
      }
      return (
        <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    swipeables: { autoplay }
  }, {
    item, pageId, pageSlug
  }) => ({
    autoplay, item, pageId, pageSlug
  })
  SectionContainer.propTypes = {
    item: PropTypes.object.isRequired,
    pageId: PropTypes.string.isRequired,
    pageSlug: PropTypes.string.isRequired
  }
  return connect(mapStateToProps)(SectionContainer)
}

export default sectionContainer
