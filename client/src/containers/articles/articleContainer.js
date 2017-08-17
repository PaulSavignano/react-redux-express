import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const articleContainer = (ComposedComponent) => {
  const ArticleContainer = ({
    article,
    dispatch,
    isFetching,
    item
  }) => (
    isFetching ? null :
    <ComposedComponent
      article={article}
      dispatch={dispatch}
      item={item}
    />
  )
  const mapStateToProps = ({
    articles,
    brand: { isFetching, article }
  }, {
    componentId
  }) => ({
    article,
    isFetching: isFetching || articles.isFetching ? true : false,
    item: !articles.isFetching && articles.items.find(item => item._id === componentId)
  })
  ArticleContainer.propTypes = {
    article: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(ArticleContainer)
}

export default articleContainer
