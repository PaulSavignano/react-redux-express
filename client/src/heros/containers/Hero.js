import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeroItem from '../components/HeroItem'

const Hero = ({ isFetching, handleImage, page, item }) => (
  isFetching ? null :
    <HeroItem page={page} item={item} handleImage={handleImage} />
)

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.heros.isFetching,
  item: state.heros.items.find(item => item.pageId === ownProps.page._id)
})

export default connect(mapStateToProps)(Hero)
