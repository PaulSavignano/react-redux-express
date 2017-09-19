import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import imagesContainer from './imagesContainer'
import flattenArray from '../../utils/flattenArray'

class LoadImages extends Component {
  state = {
    loadingItemImages: true,
    loadingItemBackgroundImages: true
  }
  handleItemImages = (items) => {
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
  handleItemBackgroundImages = (items) => {
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
  componentDidMount() {
    const { pages } = this.props
    const itemsArray = pages.map(page => page.sections.map(section => section.items.map(item => item)))
    const items = flattenArray(itemsArray)
    this.handleItemImages(items)
    this.handleItemBackgroundImages(items)
  }
  render() {
    const {
      loadingItemImages,
      loadingItemBackgroundImages
    } = this.state
    const {
      children,
    } = this.props
    return (
      loadingItemImages || loadingItemBackgroundImages ? null :
      <CSSTransitionGroup
        transitionName="fadein"
        transitionAppear={true}
        transitionAppearTimeout={300}
        transitionEnter={false}
        transitionLeave={false}
      >
        {children}
      </CSSTransitionGroup>
    )
  }
}

LoadImages.propTypes = {
  pages: PropTypes.array.isRequired,
}


export default imagesContainer(LoadImages)
