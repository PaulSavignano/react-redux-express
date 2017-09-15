import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const slideShowContainer = (ComposedComponent) => {
  class SlideShowContainer extends Component {
    state = {
      propsForParent: null,
      propsForChild: null
    }
    handleProps = (item) => {
      const {
        _id,
        image,
        values: {
          alignItems,
          backgroundColor,
          containerMarginTop,
          flexFlow,
          justifyContent,
          maxWidth,
          minHeight,
          margin,
          padding,
          pageLink,
        }
      } = item
      const propsForParent = {
        id: pageLink || _id,
        style: {
          backgroundImage: image.src ? `url(${image.src})` : null,
          backgroundColor,
          marginTop: containerMarginTop,
          maxWidth,
          minHeight,
          position: 'relative'
        },
        className: image.src ? 'section background-image' : 'section'
      }
      const propsForChild = {
        style: {
          alignItems,
          display: 'flex',
          flexFlow,
          justifyContent,
          margin,
          padding
        }
      }
      this.setState({ propsForParent, propsForChild })
    }
    componentWillMount() {
      this.handleProps(this.props.item)
    }
    componentWillReceiveProps(nextProps) {
      this.handleProps(nextProps.item)
    }
    render() {
      const {
        propsForParent,
        propsForChild
      } = this.state
      const {
        autoplay,
        dispatch,
        item,
        pageId,
        pageSlug,
      } = this.props
      const props = {
        autoplay,
        dispatch,
        item,
        propsForParent,
        propsForChild,
        pageId,
        pageSlug,
      }
      return (
        <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    swipeables: { autoplay },
  }, {
    item,
    pageId,
    pageSlug
  }) => ({
    autoplay,
    item,
    pageId,
    pageSlug
  })
  SlideShowContainer.propTypes = {
    autoplay: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    pageId: PropTypes.string.isRequired,
    pageSlug: PropTypes.string.isRequired
  }
  return connect(mapStateToProps)(SlideShowContainer)
}

export default slideShowContainer
