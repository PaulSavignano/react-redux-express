import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const articleContainer = (ComposedComponent) => {
  class ArticleContainer extends Component {
    render() {
      const {
        article,
        dispatch,
        editItem,
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
        editItem,
        hasButtons,
        hasHeading,
        hasMedia,
        hasParagraph,
        item,
        typography
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    articles: { editItem },
    brand: { isFetching, article, typography }
  }, {
    item
  }) => {
    const hasHeading = item.values.h1Text || item.values.h2Text || item.values.h3Text ? true : false
    const hasMedia = item.image.src || item.iframe ? true : false
    const hasParagraph = item.values.pText && item.values.pText.length > 8 ? true : false
    const hasButtons = item.values.button1Text ? true : false
    return {
      article,
      editItem,
      hasButtons,
      hasHeading,
      hasMedia,
      hasParagraph,
      isFetching,
      item,
      typography
    }
  }
  ArticleContainer.propTypes = {
    article: PropTypes.object.isRequired,
    editItem: PropTypes.object.isRequired,
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
