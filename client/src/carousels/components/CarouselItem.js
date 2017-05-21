import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'

const CarouselItem = ({ item }) => {
  const { image, values } = item
  let text
  if (item.values) {
    if (values.text) {
      text = values.text
    }
  }
  return (
    <CSSTransitionGroup
      transitionName="image"
      transitionAppear={true}
      transitionAppearTimeout={900}
      transitionEnter={false}
      transitionLeave={false}
    >
      <div style={{ margin: '0 auto 0 auto'}}>
        <div style={{ textAlign: 'center', fontSize: 24, padding: 10, fontStyle: 'italic' }}>
          {text}
        </div>
        <img src={image} alt="card" style={{ padding: 10 }}/>
      </div>
    </CSSTransitionGroup>
  )
}

export default connect()(CarouselItem)
