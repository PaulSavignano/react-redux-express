import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'


const swipeableContainer = (ComposedComponent) => {
  class SwipeableContainer extends Component {
    state = {
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
        img.onload = () => this.setState({ loadingBackground: false })
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
          margin,
          maxWidth,
          minHeight,
          pageLink,
        }
      } = item
      const propsForParent = {
        id: pageLink || _id,
        style: {
          backgroundImage: image.src && `url(${image.src})`,
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
        autoplay,
        dispatch,
        item,
        pageId,
        pageSlug,
        propsForParent,
        propsForChild
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
    swipeables: { autoplay },
  }, {
    item, pageId, pageSlug
  }) => ({
    autoplay,
    item, pageId, pageSlug
  })
  SwipeableContainer.propTypes = {
    autoplay: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    pageId: PropTypes.string.isRequired,
    pageSlug: PropTypes.string.isRequired
  }
  return connect(mapStateToProps)(SwipeableContainer)
}

export default swipeableContainer
