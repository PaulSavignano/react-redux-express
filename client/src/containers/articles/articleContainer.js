import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const articleContainer = (ComposedComponent) => {
  const ArticleContainer = ({
    article,
    dispatch,
    isFetching,
    item,
    typography
  }) => {
    const props = {
      article,
      dispatch,
      item,
      typography
    }
    return (
      isFetching ? null : <ComposedComponent {...props} />
    )
  }
  const mapStateToProps = ({
    articles,
    brand: { isFetching, article, typography }
  }, {
    componentId
  }) => ({
    article,
    isFetching: isFetching || articles.isFetching ? true : false,
    item: !articles.isFetching && articles.items.find(item => item._id === componentId),
    typography
  })
  ArticleContainer.propTypes = {
    article: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(ArticleContainer)
}

export default articleContainer
