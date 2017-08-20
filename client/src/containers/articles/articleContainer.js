import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const articleContainer = (ComposedComponent) => {
  class ArticleContainer extends Component {
    handleButtonClick = (buttonLink) => {
      const { dispatch } = this.props
      if (buttonLink.indexOf("/") === 0) {
        return { onTouchTap: dispatch(push(buttonLink)) }
      } else {
        return { onTouchTap: window.location = buttonLink }
      }
    }
    render() {
      const {
        article,
        dispatch,
        hasButtons,
        hasHeading,
        hasMedia,
        hasParagraph,
        isFetching,
        item,
        typography
      } = this.props
      const props = {
        article,
        dispatch,
        hasButtons,
        hasHeading,
        hasMedia,
        hasParagraph,
        item,
        onButtonClick: this.handleButtonClick,
        typography
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    articles,
    brand: { isFetching, article, typography }
  }, {
    componentId
  }) => {
    const item = !articles.isFetching && articles.items.find(item => item._id === componentId)
    const hasHeading = !articles.isFetching && item.values.h1Text || item.values.h2Text || item.values.h3Text ? true : false
    const hasMedia = !articles.isFetching && item.image.src || item.iframe ? true : false
    const hasParagraph = !articles.isFetching && item.values.pText && item.values.pText.length > 8 ? true : false
    const hasButtons = !articles.isFetching && item.values.buttonText ? true : false
    return {
      article,
      hasButtons,
      hasHeading,
      hasMedia,
      hasParagraph,
      isFetching: isFetching || articles.isFetching ? true : false,
      item,
      typography
    }

  }
  ArticleContainer.propTypes = {
    article: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    hasButtons: PropTypes.bool.isRequired,
    hasHeading: PropTypes.bool.isRequired,
    hasMedia: PropTypes.bool.isRequired,
    hasParagraph: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(ArticleContainer)
}

export default articleContainer
