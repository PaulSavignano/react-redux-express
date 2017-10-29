import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'

import getSectionImages from '../../utils/getSectionImages'
import loadImages from '../../utils/loadImages'

const sectionContainer = (ComposedComponent) => {
  class SectionContainer extends Component {
    state = {
      loadingImages: true
    }
    componentWillMount() {
      const { item } = this.props
      const sectionImages = getSectionImages(item)
      if (sectionImages.length) {
        return loadImages(sectionImages).then(() => this.setState({ loadingImages: false }))
      }
      return this.setState({ loadingImages: false })
    }
    render() {
      const { loadingImages } = this.state
      const {
        autoplay,
        dispatch,
        item,
        pageId,
        pageSlug,
        textColor
      } = this.props
      const {
        backgroundImage,
        values: {
          alignItems,
          backgroundPosition,
          backgroundColor,
          flexFlow,
          justifyContent,
          margin,
          maxWidth,
          minHeight,
          padding,
        }
      } = item
      const props = {
        autoplay,
        dispatch,
        item,
        pageId,
        pageSlug,
        propsForParent: {
          style: {
            backgroundImage: backgroundImage.src && `url(${backgroundImage.src})`,
            backgroundColor,
            backgroundPosition
          },
          className: backgroundImage.src ? 'section-container background-image' : 'section-container'
        },
        propsForChild: {
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
        loadingImages ? null :
        <CSSTransitionGroup
          transitionName="fadein"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnter={false}
          transitionLeave={false}
        >
          <ComposedComponent {...props} />
        </CSSTransitionGroup>
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
