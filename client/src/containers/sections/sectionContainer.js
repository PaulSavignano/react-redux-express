import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'


const sectionContainer = (ComposedComponent) => {
  class SectionContainer extends Component {
    state = {
      backgroundImage: false,
      loadingBackground: true,
      loadingItemImages: true,
      loadingItemBackgroundImages: true,
      propsForParent: null,
      propsForChild: null
    }
    handleBackgroundImage = () => {
      const { image } = this.props.item
      if (image && image.src) {
        const img = new Image()
        const src = image.src
        img.onload = () => this.setState({ backgroundImage: true, loadingBackground: false })
        img.src = src
      } else {
        this.setState({ loadingBackground: false })
      }
    }
    handleItemImages = () => {
      const { items } = this.props.item
      let qty = 0
      let qtyLoaded = 0
      items.forEach(({ image }) => {
        if (image && image.src) {
          qty = qty + 1
          const img = new Image()
          const src = image.src
          img.onload = () => {
            qtyLoaded = qtyLoaded + 1
          }
          img.src = src
        }
      })
      if (qty === qtyLoaded) {
        this.setState({ loadingItemImages: false })
      }
    }
    handleItemBackgroundImages = () => {
      const { items } = this.props.item
      let qty = 0
      let qtyLoaded = 0
      items.forEach(({ backgroundImage }) => {
        if (backgroundImage && backgroundImage.src) {
          qty = qty + 1
          const img = new Image()
          const src = backgroundImage.src
          img.onload = () => {
            qtyLoaded = qtyLoaded + 1
          }
          img.src = src
        }
      })
      if (qty === qtyLoaded) {
        this.setState({ loadingItemBackgroundImages: false })
      }
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
          pageLink,
        }
      } = item
      const propsForParent = {
        id: pageLink || _id,
        style: {
          backgroundImage: image.src ? `url(${image.src})` : null,
          backgroundColor,
          marginTop: containerMarginTop,
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
          maxWidth,
          margin
        }
      }
      this.setState({ propsForParent, propsForChild })
    }
    componentWillMount() {
      this.handleBackgroundImage()
      this.handleItemImages()
      this.handleItemBackgroundImages()
      this.handleProps(this.props.item)
    }
    componentWillReceiveProps(nextProps) {
      this.handleProps(nextProps.item)
    }
    render() {
      const {
        loadingBackground,
        loadingItemImages,
        loadingItemBackgroundImages,
        propsForParent,
        propsForChild
      } = this.state
      const {
        dispatch,
        item,
        autoplay,
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
        !loadingBackground && !loadingItemImages && !loadingItemBackgroundImages ?
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnter={false}
          transitionLeave={false}
          style={{ width: '100%' }}
        >
          <ComposedComponent {...props} />
        </CSSTransitionGroup>
          : null
      )
    }
  }
  const mapStateToProps = ({
  }, {
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
