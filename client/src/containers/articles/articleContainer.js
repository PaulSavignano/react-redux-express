import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const articleContainer = (ComposedComponent) => {
  const ArticleContainer = ({
    dispatch,
    isFetching,
    item
  }) => (
    isFetching ? null :
    <ComposedComponent
      dispatch={dispatch}
      item={item}
    />
  )
  const mapStateToProps = ({ articles: { isFetching, items } }, { componentId }) => ({
    isFetching,
    item: items.find(item => item._id === componentId)
  })
  ArticleContainer.propTypes = {
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(ArticleContainer)
}

export default articleContainer
