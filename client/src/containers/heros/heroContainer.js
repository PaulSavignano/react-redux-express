import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const heroContainer = (ComposedComponent) => {
  class HeroContainer extends Component {
    state = {
      propsForParent: null
    }
    handleProps = (item) => {
      const { alignItems, minHeight } = this.props.heroStyle.values
      const {
        backgroundImage,
        values: {
          backgroundColor,
          backgroundPosition
        }
      } = item
      const propsForParent = {
        style: {
          alignItems,
          backgroundImage: backgroundImage.src && `url(${backgroundImage.src})`,
          backgroundPosition,
          backgroundColor,
          minHeight,
        },
        className: backgroundImage.src ? 'hero background-image' : 'hero'
      }
      this.setState({ propsForParent })
    }
    componentWillMount() {
      this.handleProps(this.props.item)
    }
    componentWillReceiveProps(nextProps) {
      this.handleProps(nextProps.item)
    }
    render() {
      const {
        propsForParent
      } = this.state
      const {
        heroStyle,
        dispatch,
        hasButtons,
        hasText,
        hasMedia,
        isFetching,
        item,
        typography
      } = this.props
      const props = {
        heroStyle,
        dispatch,
        hasButtons,
        hasText,
        hasMedia,
        item,
        propsForParent,
        typography
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, heroStyle, typography }
  }, {
    item
  }) => ({
    heroStyle,
    hasButtons: item.values.button1Text ? true : false,
    hasText: item.values.h1Text || item.values.h2Text || item.values.h3Text || item.values.pText.length > 9 ? true : false,
    hasMedia: item.image.src || item.values.iframe ? true : false,
    isFetching,
    item,
    typography
  })
  HeroContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    hasButtons: PropTypes.bool.isRequired,
    hasText: PropTypes.bool.isRequired,
    hasMedia: PropTypes.bool.isRequired,
    heroStyle: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(HeroContainer)
}

export default heroContainer
