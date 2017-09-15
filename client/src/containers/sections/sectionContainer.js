import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const sectionContainer = (ComposedComponent) => {
  class SectionContainer extends Component {
    state = {
      backgroundImage: false,
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
          marginLeft: 'auto',
          marginRight: 'auto',
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
        dispatch,
        item,
        pageId,
        pageSlug,
      } = this.props
      const props = {
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
  const mapStateToProps = (state, {
    item, pageId, pageSlug
  }) => ({
    item, pageId, pageSlug
  })
  SectionContainer.propTypes = {
    item: PropTypes.object.isRequired,
    pageId: PropTypes.string.isRequired,
    pageSlug: PropTypes.string.isRequired
  }
  return connect(mapStateToProps)(SectionContainer)
}

export default sectionContainer
