import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const articleContainer = (ComposedComponent) => {
  class ArticleContainer extends Component {
    render() {
      const {
        articleStyle,
        dispatch,
        hasButtons,
        hasMedia,
        hasText,
        isFetching,
        item,
        typography
      } = this.props
      const props = {
        articleStyle,
        dispatch,
        hasButtons,
        hasMedia,
        hasText,
        item,
        typography
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, articleStyle, typography }
  }, {
    item
  }) => ({
    articleStyle,
    hasButtons: item.values.button1Text ? true : false,
    hasText: item.values.h1Text || item.values.h2Text || item.values.h3Text || item.values.pText.length > 9 ? true : false,
    hasMedia: item.image.src || item.values.iframe ? true : false,
    isFetching,
    item,
    typography
  })
  ArticleContainer.propTypes = {
    articleStyle: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    hasButtons: PropTypes.bool.isRequired,
    hasMedia: PropTypes.bool.isRequired,
    hasText: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(ArticleContainer)
}

export default articleContainer
