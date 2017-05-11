import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeroItem from '../components/HeroItem'

const Hero = ({ isFetching, page, hero }) => {
  return (
    <HeroItem page={page} hero={hero} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.heros.isFetching
  const hero = isFetching ? {} : state.heros.items.find(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    hero
  }
}

export default connect(mapStateToProps)(Hero)
