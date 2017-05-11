import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeroItem from '../components/HeroItem'

const Hero = ({ isFetching, page, item }) => {
  return (
    <HeroItem page={page} item={item} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.heros.isFetching
  const item = isFetching ? {} : state.heros.items.find(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    item
  }
}

export default connect(mapStateToProps)(Hero)
